from .models import Booking
from .serializers import BookingSerializer
from rest_framework import permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BaseApiView(generics.ListAPIView):
    pass


class BaseApiDetailView(generics.RetrieveUpdateDestroyAPIView, generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]


class BookingListView(BaseApiView):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()


class BookingDetailView(BaseApiDetailView):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
