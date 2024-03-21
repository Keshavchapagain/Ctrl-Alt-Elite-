from django.db import models


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
    name = models.CharField(max_length=200)
    departure_location = models.CharField(max_length=200)
    arrival_location = models.CharField(max_length=200)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=200)
    duration_hrs = models.IntegerField()
    inclusions = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Package(models.Model):
    name = models.CharField(max_length=200)
    duration_days = models.IntegerField()
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Relationships between travelPackages and flight, hotel and activities
    hotels = models.ManyToManyField(Hotel)
    flights = models.ManyToManyField(Flight)
    activities = models.ManyToManyField(Activity)

    def __str__(self):
        return self.name
