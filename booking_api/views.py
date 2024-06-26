from django.views.decorators.csrf import csrf_exempt

from travel_api.models import Package
from .models import Booking  # CustomPackageBooking
from .serializers import BookingSerializer  # CustomPackageBookingSerializer
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail

" list the booking "


class BookingApiView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request):
        booking = Booking.objects.all()
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


"Allows user to create a Booking"


class EmailMixin:

    def send_email(self, to_email, subject, message):
        from_email = settings.EMAIL_HOST_USER
        send_mail(subject, message, from_email, [to_email], fail_silently=False)


class BookingCreateView(APIView, EmailMixin):
    # permission_classes = [permissions.IsAuthenticated]

    @csrf_exempt
    def post(self, request):
        pack = Package.objects.all().filter(name=request.data["packageName"]).first()
        package_name = request.data['packageName']
        booking = request.data
        booking['package'] = pack.pk
        print(booking)
        zip_code = booking['zip_code']
        city = booking['city']
        cost = booking['cost']
        serializer = BookingSerializer(data=booking)
        if serializer.is_valid():
            serializer.save()
            self.send_email(
                to_email=serializer.instance.email,
                subject='Concordia Travels: Booking Creation',
                message=f'Hi {serializer.instance.first_name} {serializer.instance.last_name}, Your booking for '
                        f'package {package_name} has been confirmed at {zip_code} in {city}. Your payment of {cost}$ '
                        f'was processed'
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"Allows user to update/delete a booking if the user is authenticated"


class BookingApiDetailView(APIView, EmailMixin):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookingSerializer

    @csrf_exempt
    def get(self, request, id):
        try:
            booking = Booking.objects.get(id=id)
            serializer = self.serializer_class(booking)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return None

    @csrf_exempt
    def put(self, request, id):
        booking = Booking.objects.get(id=id)
        if not booking:
            return Response(
                {"res": "Object with book id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        package_name = request.data['packageName']
        zip_code = booking['zip_code']
        city = booking['city']
        serializer = BookingSerializer(instance=booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            self.send_email(
                to_email=serializer.instance.email,
                subject='Concordia Travels: Booking Update',
                message=f'Hi {serializer.instance.first_name} {serializer.instance.last_name}, Your booking for '
                        f'package {package_name} at {zip_code} in {city} has been updated successfully'
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def delete(self, request, id):
        booking = Booking.objects.get(id=id)

        to_email = booking.email
        first_name = booking.first_name
        last_name = booking.last_name
        if not booking:
            return Response(
                {"res": "Booking with given id doesn't exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.send_email(
            to_email=to_email,
            subject='Concordia Travels: Booking Cancellation',
            message=f'Hi {first_name} {last_name}, Your booking for {booking.package.name} has been Cancelled.'
        )
        booking.delete()
        return Response(
            {"res": "Booking Deleted Successfully"},
            status=status.HTTP_200_OK
        )


" Allows user to search booking"


class BookingSearchAPIView(APIView):
    @csrf_exempt
    def get(self, request):
        query = request.query_params.get('query', '')
        booking = Booking.objects.filter(name__icontains=query)
        serializer = BookingSerializer(booking, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
