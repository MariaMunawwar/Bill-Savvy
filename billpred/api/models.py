from django.db import models

# Create your models here.

class BillPred(models.Model):
    bedrooms = models.IntegerField()
    number_of_people = models.IntegerField()
    has_ac = models.BooleanField()
    has_tv = models.BooleanField()
    number_of_fans = models.IntegerField()
    uses_energy_efficient_appliances = models.BooleanField()
    uses_renewable_energy = models.BooleanField()
    washing_machine_usage = models.CharField(max_length=100)
    number_of_electronic_devices = models.CharField(max_length=100)
    prediction_result = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
