from .models import Booking #CustomPackageBooking
from .serializers import BookingSerializer #CustomPackageBookingSerializer
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail

#from send_emailapi import utils as email_send

" list the booking "


class BookingApiView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request):
        booking = Booking.objects.all()
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


"Allows user to create a Booking"


class BookingCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def send_email(self,booking):
        from_email = settings.EMAIL_HOST_USER
        to_email =  settings.EMAIL_HOST_USER
        subject = 'Concordia Travels: Booking Creation'
        #first_name = booking.first_name
        message = f'Hi , Your booking has been confirmed.'
        send_mail(subject, message, from_email, [to_email] , fail_silently=False)

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            self.send_email(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"Allows user to update/delete a booking if the user is authenticated"


class BookingApiDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return Booking.objects.get(id=id)
        except Booking.DoesNotExist:

            return None

    def put(self, request, id):
        booking = self.get_object(id)
        if not booking:
            return Response(
                {"res": "Object with book id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = BookingSerializer(instance= booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        booking = self.get_object(id)
        if not booking:
            return Response(
                {"res": "Booking with given id doesn't exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        booking.delete()
        return Response(
            {"res": "Booking Deleted Successfully"},
            status=status.HTTP_200_OK
        )


" Allows user to search booking"


class BookingSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('query', '')
        booking = Booking.objects.filter(name__icontains=query)
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
