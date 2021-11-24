"use strict";
import express from "express";
import * as fs from "fs";
import cors from "cors";
import pkg from 'pg';
import {writeFile, readFileSync, existsSync, fstat} from 'fs';
const {Client} = pkg;

//Starts the postgres client
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//       rejectUnauthorized: false
//   }
// });

// client.connect();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.use(express.json());
app.use(cors());


let courses = [];

function reload(filename) 
{
  if (fs.existsSync(filename)) 
  {
    courses = JSON.parse(fs.readFileSync(filename));
  }
  else 
  {
    courses = [];
  }
}

//Serve homepage when going to "localhost:8000/"
app.get('/', (req, res) => {
  const options = {root: '/'};
  res.set('Content-Type', 'text/html');
  const home = readFileSync('client/home.html');
  res.send(home);
});

app.get('/getScores', function(req, res) 
{
  reload(courseFile);
  let result = [];
  for(const key in courses)
  {
    result.push(courses[key]);
  }
  res.send(JSON.stringify(result)); //This will just be a dummy response for now, check courses.json for what the response will look like
});

app.post("/createCourse", function(req, res)
{
  reload(courseFile);
  //Write param to courses
  //TODO: Check if the POST param fits actual course object
  courses.push(req.query);
  fs.writeFileSync(courseFile, JSON.stringify(courses));
  res.send(JSON.stringify(req.query));
  reload(courseFile);
});

app.post("/reset", function(req, res){
  fs.writeFileSync(courseFile, "");
  courses = [];
});

app.listen(port, function() {console.log(`server listening at http://localhost:${port}`)});