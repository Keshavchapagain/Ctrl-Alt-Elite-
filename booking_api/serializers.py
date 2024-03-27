from rest_framework import serializers
from .models import Booking
from travel_api.serializers import (PackageSerializer,
                                    HotelSerializer,
                                    FlightSerializer)


class BookingSerializer(serializers.ModelSerializer):
    package = PackageSerializer

    class Meta:
        model = Booking
        fields = '__all__'
