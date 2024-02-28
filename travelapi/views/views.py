from travelapi.models.travelModels import Hotel, Flight, Activity, Package
from travelapi.serializers.travelSerializers import HotelSerializer, FlightSerializer, ActivitySerializer, \
    PackageSerializer
from rest_framework import permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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


class PackageSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('query', '')
        packages = Package.objects.filter(name__icontains=query)
        serializer = PackageSerializer(packages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
