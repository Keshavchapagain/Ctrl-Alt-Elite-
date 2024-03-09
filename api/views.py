from django.contrib.admin import action
from rest_framework import viewsets
from .models import Package, Hotel
from .serializers import PackageSerializer, HotelSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    ser_class = PackageSerializer

    def get_queryset(self):
        return Package.objects.all()

    def perform_create(self, serializer):
        serializer.save()

#    def perform_update(self, request, pk=None):
 #       package =

    def get_serializer_class(self):
        return PackageSerializer


class HotelApiDetailView(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
