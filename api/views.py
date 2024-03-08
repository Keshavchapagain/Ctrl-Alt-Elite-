from rest_framework import viewsets
from rest_framework.response import Response

from .models import Package
from .serializers import PackageSerializer


# class PackageViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Package.objects.all()
#     serializer_class = PackageSerializer(queryset,many=True)


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    ser_class = PackageSerializer

    def get_queryset(self):
        return Package.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def get_serializer_class(self):
        return PackageSerializer

