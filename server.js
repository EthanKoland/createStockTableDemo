const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Load the environment variables in the .env script
require('dotenv').config()

//Connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



//Set up the server to additional functionality
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Set up the server to use the public folder
app.set('/views', express.static(__dirname + 'public/views'));
app.set('/css', express.static(__dirname + '/public/css'));
app.set('/images', express.static(__dirname + '/public/images'));
app.set('view engine', 'pug');

//Set up the server to use the routes
const testPageRouter = require('./routes/testPage');

app.use('/testPage', testPageRouter);

app.listen(3000, () => console.log('Server Started'))