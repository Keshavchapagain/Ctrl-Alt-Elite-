from django.contrib.admin import action
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Package, Hotel
from .serializers import PackageSerializer, HotelSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    ser_class = PackageSerializer
    lookup_field = 'name'


    def get_serializer_class(self):
        return PackageSerializer

