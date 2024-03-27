from django.urls import path
from booking_api import views


urlpatterns = [
    path('booking', views.BookingApiView.as_view({'get': 'list'})),
    path('booking/create', views.BookingCreateView.as_view()),
    path('booking/<int:id>', views.BookingApiDetailView.as_view())
]