from django.urls import path, include
from django.contrib import admin

from django_sns.views import UserAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user', UserAPI.as_view())
    # path('api/', include('app.urls')),
]
