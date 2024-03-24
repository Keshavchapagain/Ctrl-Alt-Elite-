from django.contrib import admin
from .models import Booking, CustomPackageBooking
# Register your models here.

admin.site.register(Booking)
admin.site.register(CustomPackageBooking)

