from django.contrib.auth import authenticate
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


class JWTSignupSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password']

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

  # TODO: 비밀번호 해시암호화 기능 필요
  def save(self, req):
    user = super(JWTSignupSerializer, self).save()
    user.username = self.validated_data['username']
    user.email = self.validated_data['email']
    user.password = self.validated_data['password']
    user.save()

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
    user = None
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email=email)
      # TODO: 패스워드 검증 로직 작성 필요
    token = RefreshToken.for_user(user)
    return {
      'user': self.serialize_user(user),
      'refresh': str(token),
      'access': str(token.access_token)
    }
