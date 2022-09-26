from django.urls import path
from django.contrib import admin
from django_sns.views import UserAPI
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django_sns.views.auth import (
    ModularSnsObtainTokenPairView,
    JWTSignupView,
    JWTLoginView
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user', UserAPI.as_view()),
    path('api/user/login', JWTLoginView.as_view()),
    path('api/user/register', JWTSignupView.as_view()),
    path('api/token', ModularSnsObtainTokenPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
]
