from rest_framework import serializers
from .models import Activity,Flight,Hotel,Saved,Checkout

class Activityserializers(serializers.ModelSerializer):
    class Meta:
        Model = Activity
        fields = '_all_'

class Flightserializers(serializers.ModelSerializer):
    class Meta:
        Model = Flight
        fields = '_all_'

class Hotelserializers(serializers.ModelSerializer):
    class Meta:
        Model = Hotel
        fields = '_all_'

class Savedserializers(serializers.ModelSerializer):
    class Meta:
        Model = Hotel
        fields = '_all_'

class Checkoutserializers(serializers.ModelSerializer):
    class Meta:
        Model = Hotel
        fields = '_all_'