"use strict";
import * as url from "url";
import express from "express";
import cors from "cors";
import pkg from 'pg';
import expressSession from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
const {Client} = pkg;


//Starts express app
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// Starts the postgres client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
});
client.connect();


//Helper function for authentication to check if user exists
async function findUser(username) {
  let users = await client.query("SELECT * FROM users");
  users = users.rows;
  console.log("In findUser()");
  console.log("Trying to find if username " + username + " exists..");
  for(let i = 0; i < users.length; i++){
    const user = users[i];
    console.log("Is it this username? " + user.username);    
    if(user.username === username){
      console.log("Found username ");
      return true;
    }
  }
  console.log("Couldn't find any matching users");
  return false;
}

//Another helper function for auth
async function validatePassword(name, pwd) {
  let users = await client.query("SELECT * FROM users");
  users = users.rows;
  console.log("In validatePassword() checking to see if this username and password pair exists:");
  console.log(name + pwd);
  for(let i = 0; i < users.length; i++){
    const user = users[i];
    console.log("Current user we're checking against:");
    console.log(user.username);
    console.log(user.password);
    if(user.username === name && user.password === pwd){
      return true;
    }
  }
  return false;
}

//Adds user to database for registering
async function addUser(name, pwd) {
  let test = await findUser(name);
  console.log("In addUser()..");
  if (test) {
    console.log("Username " + name + " already exists.")
    return false;
  }
  console.log("No username of " + name + " found. Adding them to database");
  const text = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [name, pwd];
  client.query(text, values, (err, res) => {
    if(err){
        console.log(err.stack);
    }
  });
  return true;
}

//Helper function to check if logged in to access their page.
function checkLoggedIn(req, res, next) {
  console.log("In checkLoggedIn()");
  if (req.isAuthenticated()) {
    console.log("Yes logged in!");
    // If we are authenticated, run the next route.
    next();
  } else {
    console.log("No not logged in yet :(");
    // Otherwise, redirect to the login page.
    res.redirect('/client/login.html');
  }
}

//Session init
const session = {
  secret : process.env.SECRET, // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
  saveUninitialized: false
};

//Passport config
const strategy = new LocalStrategy(async (username, password, done) => {
  console.log("In strategy");
  if (!findUser(username)) {
      console.log("Cannot find user " + username);
      // no such user
      return done(null, false, { 'message' : 'Wrong username' });
  }
  if (!validatePassword(username, password)) {
      console.log("User found, but password invalid");
      // invalid password
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, { 'message' : 'Wrong password' });
  }
  console.log("Succesfully logged in!")
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, username);
});

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

//App using stuff
passport.use(strategy);
app.use(expressSession(session));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

//Serve homepage
app.get('/', (req, res) => {
  const options = {root: app.path() + "client/"};
  const fileName = "home.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:' + fileName);
    }
  });
  //TODO: remove this
  console.log(req.sessionID);
  console.log(req.user);
});

app.get("/client/my-courses.html", checkLoggedIn, (req, res) =>{
  console.log("req.user = ");
  console.log(req.user);
  const options = {root: app.path() + "client/"};
  res.sendFile("my-courses.html", options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: my-courses.html');
    }})
})

app.get('/client/:name', (req, res) => {
  const options = {root: app.path() + "client/"};
  const fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:' + fileName);
    }
  });
});

app.post('/login',
	 passport.authenticate('local' , {     // use username/password authentication
	     'successRedirect' : '/client/my-courses.html',   // when we login, go to /private 
	     'failureRedirect' : '/client/register.html'      // otherwise, back to login
  }));

app.post('/register', (req, res) => {
    const username = req.body['username'];
    const password = req.body['password'];
    if (addUser(username, password)){	
      res.redirect('client/login.html');
    } 
    else {res.redirect('/client/register.html');
    }
});

app.get('/logout', checkLoggedIn, (req, res) => {
  console.log("in /logout");
  req.logout(); // Logs us out!
  res.redirect('/client/login.html'); // back to login
});

async function queryByName(name)
{
  let result = await client.query(`SELECT * FROM courses WHERE name LIKE '%${name}%'`);
  result = result.rows;
  console.log(result);
  return result;
}

app.get('/getCourses', async function(req, res) 
{
  let params = url.parse(req.url, true).query;
  console.log(params.name);
  let result = await queryByName(params.name);
  res.json(result);
});

app.post("/addCourse", checkLoggedIn, async function(req, res)
{
  //TODO: Check if the POST param fits actual course object
  //TODO: Check if same course is being added twice
  const course = req.body;
  let courses = await client.query("SELECT schedule FROM users WHERE username=$1", [req.user]);
  courses = courseHelper(courses);
  let foundCourse = false;
  for(let i = 0; i < courses.length; i++){
    const course = courses[i];
    if(course.name === req.body.name && course.instructor === req.body.instructor && course.Time === req.body.Time){
      //DON"T ADD ANOTHER COURSE!
      foundCourse = true;
    }
  }
  if(!foundCourse){
    courses.push(course);
    client.query("UPDATE users SET schedule=$1 WHERE username=$2", [JSON.stringify(courses), req.user]);
  }
  res.end();
});



app.post("/deleteCourse", checkLoggedIn, async function(req, res)
{
  let courses = await client.query("SELECT schedule FROM users WHERE username=$1", [req.user]);
  courses = courseHelper(courses);
  //Loop through courses to find course to delete
  console.log(req.body);;
  for(let i = 0; i < courses.length; i++){
    const course = courses[i];
    console.log(course);
    if(course.name === req.body.name && course.instructor === req.body.instructor && course.Time === req.body.Time){
      //Delete course
      courses.splice(i, 1);
      client.query("UPDATE users SET schedule=$1 WHERE username=$2", [JSON.stringify(courses), req.user])
    }
  }
  res.end();
})


app.get("/myCourses", checkLoggedIn, async function(req, res)
{
  let courses = await client.query("SELECT schedule FROM users WHERE username=$1", [req.user]);
  courses = courseHelper(courses);
  console.log(courses);
  res.json(courses);
});

function courseHelper(courses){//Helper func for parsing course data
  courses = courses.rows[0];
  console.log(courses);
  courses = courses.schedule;
  if(courses === null){
    courses = [];
  }
  else{
    courses = JSON.parse(courses);
  }
  return courses;
}


app.listen(port, function() {console.log(`server listening at http://localhost:${port}`)});