// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signupRouter  = require('./signup.js');
const loginRouter = require('./login.js');
const surveyRouter = require('./survey.js');
const dashboardRouter = require('./dashboard.js');
const tipsRouter = require('./tips.js');

const app = express();
const port = 3001;

// Connect to MongoDB or mongoose connection
mongoose.connect('mongodb+srv://simraashahid:simra2003@cluster0.zh0ne34.mongodb.net/BillSavvy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Middleware to parse JSON data
app.use(express.json());


// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

//use the signup route
app.use('/signup', signupRouter);

//use te login route
app.use('/login', loginRouter);

// use the survey router
app.use('/api', surveyRouter);

//use the tips router
app.use('/tips', tipsRouter);

//use the dashboard route
app.use('/dashboard', dashboardRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


//start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});