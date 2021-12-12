Team Name: team-hay

Application Name: 5 College Course Searcher and Scheduler

Semester: Fall 2021

Overview: We have scraped course data off of a database and constructed a novel application that allows the user to navigate the course data and build their own schedule using all of the courses in the 5 college area. This application allows users to login and save their individual schedule to our database.

Team Members: Tim Dalton (@TDalton52 on Github), Thant Kyaw Hset (@thantkyaw10)

Link to Heroku app: https://dashboard.heroku.com/apps/college-scheduler-server-326

UI Components: 
1. A homepage screen with links to the user's schedule and a login page as well as a search bar that allows for searching of the courses.

2. A login page and a registration page that allows user authentication.

3. A search results page that aggregates all of the courses that match the user's search.

4. A course schedule page that lists the user's schedule in grid format.

5. A my courses page which only a logged in user can access that lists the courses the user have added to their schedule.

APIs: 
1. GET /getCourses allows for searching of the database.

2. POST /addCourse allows for a user to add a course to their own course list.

3. POST /deleteCourse allows for deletion of a course from a users schedule

4. GET /myCourses returns all the courses the user has in their schedule

5. POST /login logs the user in if correct information is inputed

6. POST /register registers the user if no duplicate username exists

7. POST /logout logs a userout if already logged in

pSQL Databases:
1. The courses database contains all of the listed courses in the 5 college area.

2. The users database contains all of the current users and their passwords and course information.

URL Routes:
1. / home page
2. /client/login login page
3. /client/register register page
4. /client/my-courses my-courses page
5. /client/results search results page
6. /client/schedule schedule page

Authentication/Authorization: The authentication allows us to know which user is which and save their course data persistently.

Division of Labor:
Tim Dalton: Built front-end pages, implemented front-end search feature, scraped and added course data, implemented /getCourses API, built schedule page to display course times properly

Thant Kyaw Hset: Built database relationships, implemented /addCourse, /deleteCoure, /myCourses API, built authorization/authentication features, built all URL routing

(Tim will have many more git commits, but this is due to testing on Heroku instead of locally, so many more bug test/fix commits were required and this does not reflect an unfair division of labor)

Conculsion: One of the trickiest parts for me was building the course scraper. Actually writing a program that scraped the data was interesting, but I got several connection refused errors during testing. It took a bit of maneuvering to get around the website's protection against scrapers. (List what you found easy/hard here)

Rubric/Things to be graded on:
1. Completeness of course data

2. Accuracy of search function

3. Consistent user authentication

4. Ability to add and remove courses from personal schedule

5. The schedule page accurately showing what courses you have added and at what times


