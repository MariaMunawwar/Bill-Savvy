//user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Survey = require('./inputdata.js');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,// to prevent duplicate  emails
    lowercase: true,
    
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    
  },
  phoneNumber: {
    type: String,
   
  },
  address: {
    type: String,
    maxlength: [100, 'Address cannot exceed 100 characters'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: (value) => !isNaN(Date.parse(value)),
      message: 'Invalid date of birth. Please provide a valid date.',
    },
  },


  // Add other fields as needed
});

// Hash the password before saving to db
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
}
});
//compare provided password with stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
}
};

// userSchema.methods.comparePassword = function(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

userSchema.virtual('survey', {
  ref: 'Survey',
  localField: '_id',
  foreignField: 'userId',
 //  justOne: true, // assuming there is only one survey per user
});

const User = mongoose.model('User', userSchema);

module.exports = User;