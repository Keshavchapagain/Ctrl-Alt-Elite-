from django.db import models
from django.db.models.functions import Now


class RoomType(models.TextChoices):
    SINGLE = 'Single Room', 'Single Room'
    DOUBLE = 'Double Room', 'Double Room'
    SUITE = 'Suite', 'Suite'


class Hotel(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    room_type = models.CharField(max_length=20, choices=RoomType.choices, default=RoomType.SINGLE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Flight(models.Model):
    name = models.CharField(max_length=200, default="[Flight name]")
    departure_location = models.CharField(max_length=200, default="[Departure Location]")
    arrival_location = models.CharField(max_length=200,default="[Arrival location]")
    departure_time = models.DateTimeField(db_default=Now())
    arrival_time = models.DateTimeField(db_default=Now())
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1000.0)

    def __str__(self):
        return self.name
class PackageDetails(models.Model):
    country = models.CharField(max_length=70, blank=False, default='[Country]')
    price = models.FloatField(default=0)
    rating = models.FloatField(default=0)
    amenities = models.CharField(max_length=100, blank=False, default='All-inclusive,Pool,Sauna,Backrooms')
    image_path = models.CharField(max_length=100, blank=False, default="quinta.png")

class Package(models.Model):
    hotel = models.OneToOneField(Hotel,on_delete=models.CASCADE,null=True)
    flight = models.OneToOneField(Flight,on_delete=models.CASCADE,null=True)
    _package = models.OneToOneField(PackageDetails,on_delete=models.CharField,null=True)
