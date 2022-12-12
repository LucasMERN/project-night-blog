const express = require('express'); // expressjs is a framework for node.js
const app = express();  // create an instance of express
const mongoose = require('mongoose');   // mongoose is a library that allows us to connect to mongodb
const passport = require('passport');   // passport is a middleware for authentication
const connectDB = require('./config/database'); // connect to mongodb
const session = require('express-session'); // express-session is a middleware for session management
const MongoStore = require('connect-mongo'); // connect-mongo is a store for Connect and Express
const methodOverride = require('method-override') // allows us to override forms to use put and delete
const mainRoutes = require('./routes/mainRoutes'); // import the main routes
const loginRoutes = require('./routes/loginRoutes'); // import the login routes
const registerRoutes = require('./routes/registerRoutes'); // import the register routes
const likeRoutes = require('./routes/likesRoutes'); // import the likes routes
const profileRoutes = require('./routes/profileRoutes'); // import the profile routes
app.locals.moment = require('moment'); // allows us to format our date

require('dotenv').config({path: './config/.env'});  // dotenv is used to store the secret keys in a .env file

// Require passport in our config
require('./config/passport')(passport)

connectDB();    // Connect to database

app.set('view engine', 'ejs');  // set the view engine to ejs
app.use(express.static('public'));  // set the public folder to serve static files
app.use(express.urlencoded({ extended: true }));    // use express to parse the form data
app.use(express.json());    // use express to parse json data
app.use(methodOverride('_method'))

// Store sessions as cookies
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

// Set passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use((err, req, res, next) => {
    // Check for the specific error thrown by Passport when the email address is already taken
    if (err.name === 'MongoError' && err.code === 11000) {
      // Display a message to the user indicating that the email address is already in use
      return res.status(400).send({
        message: 'This email address is already in use.'
      });
    }
    // Handle other errors
    next(err);
  });

// Routes
app.use('/', mainRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/like', likeRoutes)
app.use('/profile', profileRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running. http://localhost:${process.env.PORT}`);
});