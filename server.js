const express = require('express'); // expressjs is a framework for node.js
const app = express();  // create an instance of express
const mongoose = require('mongoose');   // mongoose is a library that allows us to connect to mongodb
const passport = require('passport');   // passport is a middleware for authentication
const connectDB = require('./config/database'); // connect to mongodb
const session = require('express-session'); // express-session is a middleware for session management
const MongoStore = require('connect-mongo'); // connect-mongo is a store for Connect and Express
const mainRoutes = require('./routes/main'); // import the main routes

require('dotenv').config({path: './config/.env'});  // dotenv is used to store the secret keys in a .env file

connectDB();    // Connect to database

app.set('view engine', 'ejs');  // set the view engine to ejs
app.use(express.static('public'));  // set the public folder to serve static files
app.use(express.urlencoded({ extended: true }));    // use express to parse the form data
app.use(express.json());    // use express to parse json data
app.use(
    session({
        secret: process.env.SESSION_SECRET, // set the secret key for the session
        resave: false,  // don't save session if unmodified
        saveUninitialized: false,   // don't create session until something stored
        store: MongoStore.create({
            client: mongoose.connection.getClient() // get the client from the mongoose connection
        }),
    })
);

// Routes
app.use('/', mainRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});