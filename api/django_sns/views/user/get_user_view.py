from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt import authentication
from rest_framework.permissions import AllowAny
from django_sns.models import User
from django_sns.serializers.user.user_serializer import UserSerializer
from django_sns.utils.response_utils import (
    create_just_data_response,
)


class GetUserView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def get(self, req: Request):
        user = req.user.__dict__
        if req.user.is_anonymous:
            raise NotFound()
        serializer = self.serializer_class(data=user)
        if serializer.is_valid():
            return create_just_data_response(serializer.validated_data)


class GetUserByIdView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny]

    def get(self, req, username):
        if User.objects.filter(username=username).exists() is False:
            raise NotFound()
        user = User.objects.get(username=username).__dict__
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            return create_just_data_response(serializer.validated_data)
