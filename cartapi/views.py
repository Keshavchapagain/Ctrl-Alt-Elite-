from .models import Saved,Checkout
from .serializers import Savedserializers,Checkoutserializers
from rest_framework import viewsets,permissions

class SavedViewSet(viewsets.ModelViewSet):
    queryset = Saved.objects.all()
    serializer_class = Savedserializers
    permission_classes = [permissions.IsAuthenticated]

class CheckoutViewSet(viewsets):
    queryset = Checkout.objects.all()
    serializer_class = Checkoutserializers
    permission_classes = [permissions.IsAuthenticated]