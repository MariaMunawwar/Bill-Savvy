// signup.js

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user.js');

// use body parser  middleware to parse request bodies
router.use(bodyParser.json());


// Handle user registration logic
router.post('/signup', async (req, res) => {
  try {
    console.log("Received signup data:", req.body);//log the signup data
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    await User.create({ ...req.body, password: hashedPassword});

  

    res.status(201).json({ message: 'Registration successful'});
  } catch (error) {
    if (error.code ===11000 && error.keyPattern && error.keyPattern.email){
      res.status(400).json({ message: 'Email already exists. Please choose a different email.'});}
    else{
      res.status(400).json({ message: 'Registration failed', error: error.message });
  }
}

    
});



module.exports = router;