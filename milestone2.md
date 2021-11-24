API:
    GET /getCourses
        Parameters: None
        Description: Returns all the courses saved under courses.json

    POST /createCourse
        Parameters: {class-name: sampleClass, school: UMass, instructor: Emery Berger, time: 100}
        Description: Creates a new course with the params and writes it to courses.json
    
    POST /reset
        Parameters: None
        Description: Deletes all the courses saved so far and resets

Division of Labor:
    Thant Kyaw Hset:
        Implemented all the POST APIs
        Wrote milestone2.md

    Timothy Dalton:
        Implemented all the GET APIs
        Wrote the search backend for results.js

Screenshots of client working properly (some dummy results are included in all searches for testing purposes): 
![Image of searching for specific class](client-images/1.png)
![Image of results of specific class](client-images/2.png)
![Image of searching across colleges](client-images/3.png)
![Results of searching across colleges](client-images/4.png)
