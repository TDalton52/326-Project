"use strict";
import express from "express";
import * as fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const courseFile = "./courses.json";
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

app.get('/getCourses', function(req, res) 
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
  const k = req.query.key;
  console.log(k);
  const v = req.query.value;
  console.log(v);
  res.send(JSON.stringify(req.query));
});

app.listen(port, function() {console.log(`server listening at http://localhost:${port}`)});