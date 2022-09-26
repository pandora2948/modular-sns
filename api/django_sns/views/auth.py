from django.contrib.auth import login
from django.http import JsonResponse
from rest_framework import permissions, views, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import User
from ..serializers.auth import LoginSerializer, ModularSnsTokenObtainPairSerializer, JWTSignupSerializer


class ModularSnsObtainTokenPairView(TokenObtainPairView):
  permission_classes = (AllowAny,)
  serializer_class = ModularSnsTokenObtainPairSerializer


class JWTSignupView(views.APIView):
  serializer_class = JWTSignupSerializer

  def post(self, req):
    serializer = self.serializer_class(data=req.data)
    is_valid = serializer.is_valid(raise_exception=False)
    if is_valid:
      serializer.save(req)
      user = User.objects.get(username=req.data['username'])
      token = RefreshToken.for_user(user)
      refresh = str(token)
      access = str(token.access_token)
      return JsonResponse({
        'message': '회원가입에 성공하였습니다.',
        'data': {
          'user': req.data['username'],
          'access': access,
          'refresh': refresh
        }
      })
    return JsonResponse(data={
      "message": "회원가입 실패"
    })


class LoginView(views.APIView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request):
    serializer = LoginSerializer(
      data=self.request.data,
      context={'request': self.request}
    )
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return Response(None, status=status.HTTP_200_OK)
