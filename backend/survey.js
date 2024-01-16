//survey.js
// Import required modules and models
const express = require('express');
const router = express.Router();
const Survey = require('./inputdata.js');
const User = require('./user.js');

// Consolidated endpoint for submitting and saving survey data
router.post('/save-form-data', async (req, res) => {
    try {
        // Extract data from request body including predicted bill
        const { bedrooms, number_of_people, has_ac, has_tv, number_of_fans, uses_energy_efficient_appliances, uses_renewable_energy, washing_machine_usage, number_of_electronic_devices, predictedBill, userId } = req.body;

        // Create a new Survey document with all fields
        const newSurvey = new Survey({
            userId,
            bedrooms,
            numberOfPeople: number_of_people,
            hasAC: has_ac,
            hasTV: has_tv,
            numberOfFans: number_of_fans,
            usesEnergyEfficientAppliances: uses_energy_efficient_appliances,
            usesRenewableEnergy: uses_renewable_energy,
            washingMachineUsage: washing_machine_usage,
            numberOfElectronicDevices: number_of_electronic_devices,
            predictedBill
        });

        // Save the Survey document
        await newSurvey.save();

        // Update the user with the reference to the survey
        await User.findByIdAndUpdate(userId, { survey: newSurvey._id });

        // Send a success response
        res.status(201).json({ message: 'Survey data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;