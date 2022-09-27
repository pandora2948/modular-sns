from rest_framework.exceptions import NotFound, AuthenticationFailed
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import User


# TODO: 사용하지 않으므로 앱에서 제거 예정
class ModularSnsTokenObtainPairSerializer(TokenObtainSerializer):
  @classmethod
  def get_token(cls, user):
    token = super(ModularSnsTokenObtainPairSerializer, cls).get_token(user)
    token['username'] = user.username
    token['email'] = user.email
    return token


"""
  회원가입을 처리하는 Serializer 클래스입니다.
"""
class JWTSignupSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'email', 'password']

  username = serializers.CharField(
    required=True,
    write_only=True,
    max_length=15
  )

  email = serializers.EmailField(
    required=True,
    write_only=True,
    max_length=255
  )

  password = serializers.CharField(
    required=True,
    write_only=True,
    style={'input_type': 'password'}
  )

  def save(self, req):
    User.objects.create_user(
      username=self.validated_data['username'],
      email=self.validated_data['email'],
      password=self.validated_data['password']
    )

  def validate(self, data):
    username = data.get('username')
    email = data.get('email')
    if User.objects.filter(username=username).exists():
      raise serializers.ValidationError('이미 존재하는 유저이름 입니다.')
    if User.objects.filter(email=email).exists():
      raise serializers.ValidationError('이미 존재하는 이메일 입니다.')
    return data


class JWTLoginSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ['email', 'password']

  email = serializers.EmailField(required=True, write_only=True)
  password = serializers.CharField(
    required=True,
    write_only=True,
    style={'input_type':'password'}
  )

  def serialize_user(self, user):
    dict_user = user.__dict__
    return {
      'username': dict_user['username'],
      'email': dict_user['email']
    }

  def validate(self, data):
    email = data.get('email', None)
    password = data.get('password', None)
    if not User.objects.get(email=email).exists(email=email):
      raise NotFound(detail="no user exists")
    user = User.objects.get(email=email)
    if not user.check_password(password):
      raise AuthenticationFailed(detail="wrong password")
    token = RefreshToken.for_user(user)
    return {
      'user': self.serialize_user(user),
      'refresh': str(token),
      'access': str(token.access_token)
    }
