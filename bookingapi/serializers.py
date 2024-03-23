from rest_framework import serializers
from .models import Booking
from travelapi.serializers.travelSerializers import PackageSerializer

class BookingSerializer(serializers.ModelSerializer):
    package = PackageSerializer

    class Meta:
        model = Booking
        fields = '__all__'
