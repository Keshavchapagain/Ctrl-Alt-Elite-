from rest_framework import serializers

from api.models import Package, Hotel, Flight, PackageDetails
from drf_writable_nested import WritableNestedModelSerializer


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class PackageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageDetails
        fields = '__all__'

class PackageSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    hotel = HotelSerializer(many=False)
    flight = FlightSerializer(many=False)
    _package = PackageDetailSerializer(many=False)
    class Meta:
        model = Package
        fields = '__all__'
