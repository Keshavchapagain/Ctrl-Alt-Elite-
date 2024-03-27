from django.db import models
from travel_api.models import (Package as TravelPackage,
                                           Hotel as TravelHotel,
                                           Flight as TravelFlight)


class Booking(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField()
    message = models.TextField()

    # relationship with package
    package = models.ForeignKey(TravelPackage, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.first_name


class CustomPackageBooking(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    # relationship with package
    hotel = models.ForeignKey(TravelHotel, on_delete=models.CASCADE, default=None)
    flight = models.ForeignKey(TravelFlight, on_delete=models.CASCADE, default=None)
    # activity = models.ForeignKey(TravelActivity, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.first_name