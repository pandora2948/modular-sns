from django.urls import path, include
from django.contrib import admin

from django_sns.views import LoginView, UserAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user', UserAPI.as_view()),
    path('api/user/login', LoginView.as_view())
]
