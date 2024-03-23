from django.db import models
from travelapi.models.travelModels import Package as TravelPackage


class Booking(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    # relationship with package
    package = models.ForeignKey(TravelPackage, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.first_name
