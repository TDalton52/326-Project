Our database is a psql database hosted by Heroku. We have a table called courses that will be filled with all of the courses in the 5 college area for the final release, but for now we just have a dummy record for testing. The other table is called users, with 2 fields: username and password. This is how we authenticate our users.

Division of Labor:
    Tim:
        Added HTML pages for login interface
        Changed client-side fetch to work with database and new routes
        Added dynamic user scheduling and courses to work with new database interactions

    TK:
        All Express routing
        All database interaction
        All user authentication
