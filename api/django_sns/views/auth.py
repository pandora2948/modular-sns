from django.http import JsonResponse
from rest_framework import views, status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import User
from ..serializers.auth import ModularSnsTokenObtainPairSerializer, JWTSignupSerializer, \
  JWTLoginSerializer


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
      }, status=status.HTTP_200_OK)
    return JsonResponse(data={
      "message": "회원가입 실패"
    })


class JWTLoginView(views.APIView):
  serializer_class = JWTLoginSerializer

  def post(self, req):
    serializer = self.serializer_class(data=req.data)
    if serializer.is_valid(raise_exception=False):
      user = serializer.validated_data['user']
      refresh = serializer.validated_data['refresh']
      access = serializer.validated_data['access']
      return JsonResponse({
        'message': '',
        'data': {
          'user': user,
          'refresh': refresh,
          'access': access
        }
      }, status=status.HTTP_200_OK)
    return JsonResponse({
      'message': '로그인에 실패하였습니다.'
    }, status=status.HTTP_401_UNAUTHORIZED)
