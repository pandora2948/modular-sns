from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from django_sns.views.auth import (
    ModularSnsObtainTokenPairView,
    JWTLoginView,
    JWTSignupView
)
from django_sns.views.user import GetUserView, GetUserByIdView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/login', JWTLoginView.as_view()),
    path('api/user/', GetUserView.as_view()),
    path('api/user/<str:username>', GetUserByIdView.as_view()),
    path('api/user/register', JWTSignupView.as_view()),
    path('api/token', ModularSnsObtainTokenPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
]
