from .models import Hotel
from .serialiers import  Hotelserializers
from rest_framework import viewsets, permissions

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = Hotelserializers
    permission_classes = [permissions.IsAuthenticated]