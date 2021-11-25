"use strict";
import express from "express";
import * as fs from "fs";
import cors from "cors";
import pkg from 'pg';
import {writeFile, readFileSync, existsSync, fstat} from 'fs';
import expressSession from "express-session";
import passport from "passport";
//import uuid from "uuid";
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

let users = [];
function reloadUsers(){
  client.query("SELECT * FROM users", async (err, res) => {
    if(err){
        console.log(err.stack);
    }
    else{
        users = res.rows;
        console.log(res.rows);
    }
  });
}
reloadUsers();
function findUser(username) {
  for(const user in users){
    if(user.username === username){
      return true;
    }
  }
  return false;
}

function validatePassword(name, pwd) {
  for(const user in users){
    if(user.username === name && user.password === pwd){
      return true;
    }
  }
  return false;
}

function addUser(name, pwd) {
  if (findUser(name)) {
    return false;
  }
  users.push({name: pwd});
  const text = "INSERT INTO users VALUES ($1, $2)";
  const values = [name, pwd];
  client.query(text, values, (err, res) => {
    if(err){
        console.log(err.stack);
    }
  });
  return true;
}

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}
//Session init
const session = {
  secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
  saveUninitialized: false
};

//Passport config
const strategy = new LocalStrategy(async (username, password, done) => {
  if (!findUser(username)) {
      // no such user
      return done(null, false, { 'message' : 'Wrong username' });
  }
  if (!validatePassword(username, password)) {
      // invalid password
      // should disable logins after N messages
      // delay return to rate-limit brute-force attacks
      await new Promise((r) => setTimeout(r, 2000)); // two second delay
      return done(null, false, { 'message' : 'Wrong password' });
  }
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



let courses = [];
//UPDATE COURSES FROM WEBSITE
function reload(){
  client.query("SELECT * FROM courses", async (err, res) => {
    if(err){
        console.log(err.stack);
    }
    else{
        courses = res.rows;
        console.log(res.rows);
    }
  });
}



reload();
//Serve homepage when going to "localhost:8000/"
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
});

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
	     'successRedirect' : '/client/my-courses.html/',   // when we login, go to /private 
	     'failureRedirect' : '/client/login.html'      // otherwise, back to login
  }));

app.post('/register', (req, res) => {
    const username = req.body['username'];
    const password = req.body['password'];
    
    if (addUser(username, password)){	
      res.redirect('client/login.html');
    } 
    else {res.redirect('/register');
    }
});

app.get('/logout', (req, res) => {
  req.logout(); // Logs us out!
  res.redirect('/login'); // back to login
});

app.get('/getCourses', async function(req, res) 
{
  reload();
  res.json(courses); //This will just be a dummy response for now, check courses.json for what the response will look like
});

app.post("/createCourse", function(req, res)
{
  //Write param to courses
  //TODO: Check if the POST param fits actual course object
  const data = req.query;
  const text = "INSERT INTO courses VALUES ($1, $2, $3, $4)";
  const values = [data.name, data.school, data.instructor, data.time];
  client.query(text, values, (err, res) => {
    if(err){
        console.log(err.stack);
    }
  });
  res.end();
});


app.listen(port, function() {console.log(`server listening at http://localhost:${port}`)});