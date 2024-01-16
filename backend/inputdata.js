// inputdata.js
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bedrooms: Number,
  numberOfPeople: Number,
  hasAC: String,
  hasTV: String,
  numberOfFans: Number,
  usesEnergyEfficientAppliances: String,
  usesRenewableEnergy: String,
  washingMachineUsage: String,
  numberOfElectronicDevices: String,
  predictedBill: Number,
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;