from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import joblib
import os
from .serializers import BillPredSerializer  # Ensure correct serializer is imported
from .models import BillPred

# Define the order and encoding for categorical features
washing_machine_order = ['About 5 to 10 times', 'More than 10 times', 'Less than 5 times', 'I do not have a washing machine']
electronic_devices_order = ['More than 5', 'Less than 5', 'None']

washing_machine_encoding = {value: index for index, value in enumerate(washing_machine_order)}
electronic_devices_encoding = {value: index for index, value in enumerate(electronic_devices_order)}

# Get the path to the model file
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Model', 'gradient_boosting_model.joblib')

# Load the model
model = joblib.load(model_path)

@api_view(['POST'])
def predict(request):
    
    print(request.data) #Just printing the data to see
    
    # Deserialize the input data from the request
    serializer = BillPredSerializer(data=request.data)
    if serializer.is_valid():
        # Convert input data to input format for model
        input_data = serializer.validated_data

        # Apply the encoding to the washing machine usage and number of electronic devices
        input_data['washing_machine_usage'] = washing_machine_encoding.get(input_data['washing_machine_usage'], -1)
        input_data['number_of_electronic_devices'] = electronic_devices_encoding.get(input_data['number_of_electronic_devices'], -1)

        # Convert boolean 'True'/'False' to '1'/'0' and prepare the list of values for prediction
        model_input = [
            input_data['bedrooms'],
            input_data['number_of_people'],
            1 if input_data['has_ac'] else 0,
            1 if input_data['has_tv'] else 0,
            input_data['number_of_fans'],
            1 if input_data['uses_energy_efficient_appliances'] else 0,
            1 if input_data['uses_renewable_energy'] else 0,
            input_data['washing_machine_usage'],
            input_data['number_of_electronic_devices'],
        ]
        
        # Convert the list to a numpy array
        input_data_as_numpy_array = np.asarray(model_input).astype(np.float32)
        
        # Reshape the data for the model
        input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
        
        # Make a prediction using the model
        prediction = model.predict(input_data_reshaped)
        
         # Create a new instance of BillPred with the validated data
        bill_pred_instance = BillPred(**serializer.validated_data)
        
        # Update the prediction_result field with the prediction result
        bill_pred_instance.prediction_result = prediction[0]
        bill_pred_instance.save()
        
        # Return the prediction as a JSON response
        return Response({'prediction': prediction[0]})
    else:
        # Return a response for invalid data
        return Response(serializer.errors, status=400)
