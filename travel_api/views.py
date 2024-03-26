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

    # def get_user(self):
    #     user = self.request.user
    #     return user
    #
    # def get_queryset(self):
    #     return Package.objects.all()
    #
    # def perform_create(self, serializer):
    #     serializer.save()
    #
    # def perform_update(self, serializer):
    #     serializer.save()
    #
    # def get_object(self):
    #     obj = get_object_or_404(self.queryset, name=self.request.query_params.get('name'))
    #     self.check_object_permissions(self.request, obj)
    #     return obj
    #
    def get_serializer_class(self):
        return PackageSerializer

