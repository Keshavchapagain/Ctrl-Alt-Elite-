from.models import Flight
from .serializers import Flightserializer
from rest_framework import viewsets, permissions

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = Flightserializer
    permission_classes = [permissions.IsAuthenticated]