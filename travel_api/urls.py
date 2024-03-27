from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from travel_api import views

router = routers.DefaultRouter()
router.register(r'packages', views.PackageViewSet, basename='packages')

urlpatterns = [
    path('', include(router.urls)),
]
