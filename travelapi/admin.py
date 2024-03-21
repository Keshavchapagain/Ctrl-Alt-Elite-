from django.contrib import admin
from travelapi.models.travelModels import Hotel, Flight, Activity, Package

# Register your models here.


admin.site.register(Hotel)
admin.site.register(Flight)
admin.site.register(Activity)
admin.site.register(Package)


