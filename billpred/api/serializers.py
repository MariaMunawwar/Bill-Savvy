from rest_framework import serializers
from .models import BillPred

class BillPredSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillPred
        #fields = '__all__' -> cannot define fields and exclude at the same time
        #exclude = ('prediction_result',)  # Exclude electricity_bill from input
        fields = [
            'bedrooms',
            'number_of_people',
            'has_ac',
            'has_tv',
            'number_of_fans',
            'uses_energy_efficient_appliances',
            'uses_renewable_energy',
            'washing_machine_usage',
            'number_of_electronic_devices'
            # Exclude 'prediction_result' as it's for output
        ]