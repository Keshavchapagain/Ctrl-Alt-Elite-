from django.db import models
from travelapi.models.travelModels import Package as TravelPackage


class Booking(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    departure = models.CharField(max_length=100)
    date = models.DateField()
    duration = models.IntegerField(default=0)
    description = models.TextField()

    # relationship with package
    package = models.ForeignKey(TravelPackage, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.name
