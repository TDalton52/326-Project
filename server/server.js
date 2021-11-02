'use strict';
import * as http from "http";
import * as url from "url";
import * as fs from "fs";

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

const server = http.createServer();
server.on("request", function(req, res)  
{
  const parsedURL = url.parse(req.url, true);
  reload(courseFile);
  if (req.method === "GET") 
  {
    let result = [];
    for(const key in courses)
    {
      result.push(courses[key]);
    }
    res.write(JSON.stringify(result)); //This will just be a dummy response for now, check courses.json for what the response will look like
  }
  else if (req.method === "POST") 
  {
    //This is not our problem just yet, we will deal with this in the next milestone
  }
  else
  {
    res.write("req.method was not GET or POST, please try again");
  }
  res.end(res.statusCode.toString());
})
server.listen(8080);