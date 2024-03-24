from rest_framework import serializers
from .models import Booking, CustomPackageBooking
from travelapi.serializers.travelSerializers import (PackageSerializer,
                                                     HotelSerializer,
                                                     FlightSerializer,
                                                     ActivitySerializer)

class BookingSerializer(serializers.ModelSerializer):
    package = PackageSerializer

    class Meta:
        model = Booking
        fields = '__all__'

# class CustomPackageBookingSerializer(serializers.ModelSerializer):
#    hotel = hotelSerializer
#    flight = FlightSerializer
#    activity = ActivitySerializer
# 
#     class Meta:
#         model = Booking
#         fields = '__all__'