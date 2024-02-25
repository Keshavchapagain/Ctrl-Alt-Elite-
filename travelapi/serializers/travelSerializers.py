from rest_framework import serializers
from travelapi.models.travelModels import Hotel, Package, Flight, Activity


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class PackageSerializer(serializers.ModelSerializer):
    hotels = HotelSerializer(many=True)
    flights = FlightSerializer(many=True)
    activities = ActivitySerializer(many=True)

    class Meta:
        model = Package
        fields = '__all__'


