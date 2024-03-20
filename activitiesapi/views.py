from .models import Activity
from .serializers import Activityserializers
from rest_framework import viewsets, permissions

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = Activityserializers