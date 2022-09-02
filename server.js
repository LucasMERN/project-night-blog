const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const connectDB = require('./config/database');

require('dotenv').config({path: './config/.env'});

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        }),
    })
)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});