from django.db import models


class RoomType(models.TextChoices):
    SINGLE = 'Single Room', 'Single Room'
    DOUBLE = 'Double Room', 'Double Room'
    SUITE = 'Suite', 'Suite'


class Hotel(models.Model):
    name = models.CharField(max_length=200,blank=True)
    address = models.CharField(max_length=200,blank=True)
    room_type = models.CharField(max_length=20, choices=RoomType.choices, default=RoomType.SINGLE)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    description = models.CharField(max_length=500,blank=True)

    def __str__(self):
        return self.name


class Flight(models.Model):
    name = models.CharField(max_length=200, blank=True)
    departure_location = models.CharField(max_length=200,blank=True)
    arrival_location = models.CharField(max_length=200,blank=True)
    departure_time = models.DateTimeField(blank=True,null=True)
    arrival_time = models.DateTimeField(blank=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=200,blank=True)
    duration_hrs = models.IntegerField(blank=True)
    inclusions = models.CharField(max_length=500,blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)

    def __str__(self):
        return self.name


class Package(models.Model):
    name = models.CharField(max_length=200)
    rating = models.FloatField(default=0,blank=True)
    # country = models.CharField(max_length=70, blank=False, default='[Country]')
    # duration_days = models.IntegerField()
    description = models.CharField(max_length=500,blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)

    amenities = models.CharField(max_length=100, blank=True, default='All-inclusive,Pool,Sauna,Backrooms')
    image_path = models.CharField(max_length=100, blank=True, default="quinta.png")

    # Relationships between travelPackages and flight, hotel and activities
    hotel = models.OneToOneField(Hotel,on_delete=models.CASCADE,null=True, blank=True)
    flight = models.OneToOneField(Flight,on_delete=models.CASCADE,null=True, blank=True)
    # activities = models.ManyToManyField(Activity,blank=True)

    def __str__(self):
        return self.name
