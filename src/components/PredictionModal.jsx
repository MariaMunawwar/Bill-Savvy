import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const PredictionForm = () => {

  //For prediction results
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    bedrooms: '',
    number_of_people: '',
    has_ac: '',
    has_tv: '',
    number_of_fans: '',
    uses_energy_efficient_appliances: '',
    uses_renewable_energy: '',
    washing_machine_usage: '',
    number_of_electronic_devices: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isNotEmptyString = (value) => value !== '' && value !== 'Select...';

  const isValidStep = (step) => {
    switch (step) {
      case 1:
        return isNotEmptyString(formData.bedrooms) &&
               isNotEmptyString(formData.number_of_people) &&
               isNotEmptyString(formData.has_ac);
      case 2:
        return isNotEmptyString(formData.has_tv) &&
               isNotEmptyString(formData.number_of_fans) &&
               isNotEmptyString(formData.uses_energy_efficient_appliances);
      case 3:
        return isNotEmptyString(formData.uses_renewable_energy) &&
               isNotEmptyString(formData.washing_machine_usage) &&
               isNotEmptyString(formData.number_of_electronic_devices);
      default:
        return false;
    }
  };

  const parseOrFallback = (value, fallbackValue) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallbackValue : parsed;
  };

  const nextStep = () => {
    if (isValidStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidStep(3)) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    //Converting data so Django can understand
    const convertedData = {
      bedrooms: parseOrFallback(formData.bedrooms, 0),
      number_of_people: parseOrFallback(formData.number_of_people, 0),
      has_ac: formData.has_ac === 'Yes',
      has_tv: formData.has_tv === 'Yes',
      number_of_fans: parseOrFallback(formData.number_of_fans, 0),
      uses_energy_efficient_appliances: formData.uses_energy_efficient_appliances === 'Yes',
      uses_renewable_energy: formData.uses_renewable_energy === 'Yes',
      washing_machine_usage: formData.washing_machine_usage || "default value",
      number_of_electronic_devices: formData.number_of_electronic_devices || "default value"
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict/', convertedData);
      setPredictionResult(response.data.prediction);
      setPredictionMade(true); // Indicate that prediction has been made
      //alert(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error('Error in submitting prediction form', error);
    }
  };

  const renderPredictionResult = () => {
    const handleViewTips = () => {
      // Redirect to the page with personalized tips
  
      window.location.href = '/personalized-tips'; // Update it with actual URL
    };
    return (
      <div className="prediction-result">
        <h3>Your Predicted Bill: {predictionResult}</h3>
        <p className="disclaimer">
          Disclaimer: This is an estimated bill and may vary based on actual usage and other factors.
        </p>
        <p className='personalized-bill'>If you want to further optimize your bill, you can apply personalized tips to your predicted bill.</p>
      <button onClick={handleViewTips} className="view-tips-button">View Tips</button>
      </div>
    );
  };



  const renderQuestions = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>
                How many bedrooms are there in your home?
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                How many people are currently living in your household?
                <input type="number" name="number_of_people" value={formData.number_of_people} onChange={handleChange} className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Do you have an AC in your home?
                <select name="has_ac" value={formData.has_ac} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <button type="button" onClick={nextStep} className="submit-button">Continue</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-group">
              <label>
                Do you have a television in your home?
                <select name="has_tv" value={formData.has_tv} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                How many ceiling fans do you have in your home?
                <input type="number" name="number_of_fans" value={formData.number_of_fans} onChange={handleChange} className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Do you use any energy-efficient appliances such as LED bulbs etc?
                <select name="uses_energy_efficient_appliances" value={formData.uses_energy_efficient_appliances} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <button type="button" onClick={nextStep} className="submit-button">Continue</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-group">
              <label>
                Do you have any renewable energy sources installed in your home such as solar panels etc?
                <select name="uses_renewable_energy" value={formData.uses_renewable_energy} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                How often do you use your washing machine for laundry in a month?
                <select name="washing_machine_usage" value={formData.washing_machine_usage} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="About 5 to 10 times">About 5 to 10 times</option>
                  <option value="More than 10 times">More than 10 times</option>
                  <option value="Less than 5 times">Less than 5 times</option>
                  <option value="I do not have a washing machine">I do not have a washing machine</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                How many computers and electronic devices do you have in your household?
                <select name="number_of_electronic_devices" value={formData.number_of_electronic_devices} onChange={handleChange} className="form-control">
                  <option value="">Select...</option>
                  <option value="More than 5">More than 5</option>
                  <option value="Less than 5">Less than 5</option>
                  <option value="None">None</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="prediction-form-container">
      {predictionMade ? (
        renderPredictionResult()
      ) : (
        <>
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}></div>
          </div>
          <div className="form-title">Forecast your bill with BillSavvy</div>
          <div className="form-description">
            BillSavvy collects this information to better understand and predict your monthly bill.
          </div>
          <form onSubmit={handleSubmit} className="form-fields">
            {renderQuestions()}
          </form>
        </>
      )}
    </div>
  );
};

export default PredictionForm;






















