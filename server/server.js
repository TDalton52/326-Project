"use strict";
import express from "express";
import * as fs from "fs";
import cors from "cors";
import pkg from 'pg';
import {writeFile, readFileSync, existsSync, fstat} from 'fs';
const {Client} = pkg;

// Starts the postgres client
const client = new Client({
  connectionString: "postgres://necirnaknrmnas:2bcf7172968ae65295b2647a1cdaf1da2ea7cb7ff74770b1a87cf8343dcb19a5@ec2-184-73-198-174.compute-1.amazonaws.com:5432/d3sbd6gu2f2j7g",
  ssl: {
      rejectUnauthorized: false
  }
});

client.connect();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.use(express.json());
app.use(cors());


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
})

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