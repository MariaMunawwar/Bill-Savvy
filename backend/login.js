// login.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./user.js');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Request body:', req.body);
    const user = await User.findOne({ email });
    console.log('Retreived user:',user);

    if (!user) {
      console.log('user not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     //const isMatch = await user.comparePassword(password);

     //if (!isMatch)
      //{console.log('Password doesnt match');

      //return res.status(401).json({ message: 'Invalid password' });
     //}
 //user matched, create JWT payload
const payload = {
  id: user._id,
  email: user.email
};

// Sign token
jwt.sign(
  payload,
  'BILLSAVVY', // Replace 'YOUR_SECRET_KEY' with your actual secret key
  { expiresIn: 3600 },
  (err, token) => {
    if (err) {
      console.error('Token signing error:', err); // Log error
      throw err;
    }
    console.log('Login successful for:', email); // Log success
    res.status(200).json({
      message: 'Login successful',
      token: 'Bearer ' + token
    });
  }
);
} catch (error) {
console.error('Login error for:', email, error); // Log error
res.status(500).json({ message: 'Login failed', error: error.message });
}
});


module.exports = router;