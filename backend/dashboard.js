// dashboard.js
const express = require('express');
const router = express.Router();
const User = require('./user.js');

// Route to get user data for the dashboard
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user data including signup information and associated survey
        const userData = await User.findById(userId).populate('survey');

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Customize the response based on your dashboard requirements
        const dashboardData = {
            userId: userData._id,
            username: userData.username,
            address: userData.address, // You might adjust this based on your data model
            signupData: {
                email: userData.email,
                phone: userData.phoneNumber,
                dateOfBirth: userData.dateOfBirth,
            },
            inputData: {
                bedrooms: userData.survey.bedrooms,
                numberOfPeople: userData.survey.numberOfPeople,
                hasAC: userData.survey.hasAC,
                hasTV: userData.survey.hasTV,
                numberOfFans: userData.survey.numberOfFans,
                usesEnergyEfficientAppliances: userData.survey.usesEnergyEfficientAppliances,
                usesRenewableEnergy: userData.survey.usesRenewableEnergy,
                washingMachineUsage: userData.survey.washingMachineUsage,
                numberOfElectronicDevices: userData.survey.numberOfElectronicDevices,
                predictedBill: userData.survey.predictedBill,
                // Add other input form fields as needed
            },
        };

        res.json(dashboardData);
    } catch (error) {
        console.error('Error fetching user data for dashboard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;