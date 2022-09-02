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

// let db,
//     dbConnectionStr,
//     dbName;

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`);
//         db = client.db(dbName);
//     });

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});