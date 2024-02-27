from travelapi.models.travelModels import Hotel, Flight, Activity, Package
from travelapi.serializers.travelSerializers import HotelSerializer, FlightSerializer, ActivitySerializer, PackageSerializer
from rest_framework import permissions, generics


class BaseApiView(generics.ListAPIView):
    pass


class BaseApiDetailView(generics.RetrieveUpdateDestroyAPIView, generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]


# views for Hotel

class HotelApiView(BaseApiView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class HotelApiDetailView(BaseApiDetailView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


# Views for Flights


class FlightApiView(BaseApiView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class FlightApiDetailView(BaseApiDetailView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


# Views for Activity


class ActivityApiView(BaseApiView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityApiDetailView(BaseApiDetailView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


# Views for Travel Packages


class PackageAPIView(BaseApiView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class PackageApiDetailView(BaseApiDetailView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
