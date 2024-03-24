from django.urls import path
from bookingapi import views


urlpatterns = [
    path('booking', views.BookingApiView.as_view({'get': 'list'})),
    path('booking/create', views.BookingCreateView.as_view())
]
