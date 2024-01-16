const express = require('express');
const router = express.Router();
const Survey = require('./inputdata.js');

// Function to generate personalized tips based on survey responses
const generateTipsAndProjectedBill = (surveyData, predictedBill) => {
  let tips = [];
  let totalSavings = 0;

  // Generalized Tips (common for all users)
  const generalizedTips = [
    // Add your generalized tips here
    "Unplug chargers, electronics, and appliances when not in use to prevent standby power consumption.",
    "Choose appliances with the ENERGY STAR label for higher energy efficiency."
  ];

  // Adding specific tips based on user responses
  if (surveyData.hasAC === 'Yes') {
    const acSavings = (predictedBill * 0.30)* 0.40; //  30% of bill is AC, saving 40% of that
    totalSavings += acSavings;
    tips.push('Use inverter AC and save 40% power.');
  }
  if (surveyData.hasTV === 'Yes') {
    const tvSavings = (predictedBill * 0.08) * 0.375; // 8% of bill is TV, saving 37.5% of that
    totalSavings += tvSavings;
    tips.push('Use energy-efficient LED TV and save 37.50% power.');
  }
  if (surveyData.numberOfFans > 5) {
    const fanSavingsPerFan = (predictedBill * 0.02) * 0.625; // 5% of bill per fan, saving 62.5% of that
  const totalFanSavings = fanSavingsPerFan * surveyData.numberOfFans;
  totalSavings += totalFanSavings;
    tips.push('Use BLDC Ceiling Fans and save 62.50% power.');
  }
  if (surveyData.washingMachineUsage === 'About 5 to 10 times' || surveyData.washingMachineUsage === 'More than 10 times') {
    const washingMachineSavings = (predictedBill * 0.15) * 0.2889; // 20% of bill is washing, saving 28.89% of that
    totalSavings += washingMachineSavings;
    tips.push('Use Fully automatic Front-Loading Washer (12KG) and save 28.89%.');
  }
  if (surveyData.usesEnergyEfficientAppliances === 'No') {
    const appliancesSavings = (predictedBill * 0.10) * 0.385; // 15% of bill is appliances, saving 38.5% of that
    totalSavings += appliancesSavings;
    tips.push('Use LED Bulb & save 40.00% power.');
    tips.push('Use Energy-Efficient Refrigerator & save 38.50% power.');
  }
  if (surveyData.usesRenewableEnergy === 'No') {
    const renewableEnergySavings = (predictedBill * 0.40) * 0.50; // 50% of bill, saving 50% of that
    totalSavings += renewableEnergySavings;
    tips.push('Install solar panels for 50% daily energy, potentially halving your electricity bill.');
    tips.push('Use solar panels day and night to save up to 90% on your electricity bill.');
  }
  // ... more conditions based on survey data for other appliances

  const projectedBill = predictedBill - totalSavings;
  const reducedPercentage = (totalSavings / predictedBill) * 100;

  return {
    personalizedTips: tips,
    generalizedTips: generalizedTips,
    projectedBill: projectedBill.toFixed(2), // round to 2 decimal places
    reducedPercentage: reducedPercentage.toFixed(2) // round to 2 decimal places
  };
  
};

// Route to get tips
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userSurveyData = await Survey.findOne({ userId });

    if (!userSurveyData) {
      return res.status(404).json({ message: 'Survey data not found' });
    }

  
    const predictedBill = userSurveyData.predictedBill;

    // Call the new function which also calculates the projected bill
    const tipsAndProjectedBill = generateTipsAndProjectedBill(userSurveyData, predictedBill);

    // Send the response with the tips and projected bill information
    res.json(tipsAndProjectedBill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tips and projected bill', error: error.message });
  }
});

module.exports = router;