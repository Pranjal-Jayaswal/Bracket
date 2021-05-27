<h1 align="center">
MernSocial
</h1>
A complete scalable social media website currently in process to be deplyed on AWS. 

***Built using NodeJS,ExpressJS and MongoDB .***

---



## Directory Structure

This code follows MVC pattern to make it more scalable : /routes - containes all the routes.

/assets - static javascript css and image files.

/controller - contains functions to connect to different views.

/model - to store data in db we need models.

/config - contains config files for mongoos or any other files being used.

/views - used by ejs(templating engine) for server side rendering.

---
## Middlewares Used

connect-flash , crypto , express-session ,
mongoose , multer, passport , passport-google-oauth , passport-jwt ,
socket.io etc.


---


***Installation***

> You just need to install dependencies:
> "npm install"
> and then run
> "npm start" command on your console.

## How to use:

Setup NodeJS and MongoDB on your system.
Fork/Clone the repo and after opening the project , run using "npm start" command on your editor(eg. VS Code)(nodemon used.)
use a web browser with url localhost:8000 to run the app.(as port used is 8000)



Open http://localhost:8000 with your browser to see the result.


Feel free to use and contribute! :)






