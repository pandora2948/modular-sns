from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from ..models import User


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


"""
  로그인 요청을 처리하는 직렬화 클래스입니다.
  사용자의 email, password 값을 폼으로 전달받고 검증 및 데이터 처리를 수행합니다.
"""


class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField(
    label='email',
    max_length=255,
    write_only=True
  )

  password = serializers.CharField(
    label='password',
    style={'input_type': 'password'},
    trim_whitespace=False,
    write_only=True
  )

  """
    사용자의 이메일, 비밀번호를 검증합니다.
  """

  def validate(self, attrs):
    email = attrs.get('username')
    password = attrs.get('password')

    if email and password:
      user = authenticate(
        request=self.context.get('request'),
        email=email,
        password=password
      )
      if not user:
        msg = '이메일 또는 비밀번호가 잘못되었습니다.'
        raise serializers.ValidationError(msg, code='authorization')
    else:
      msg = '이메일, 비밀번호 항목을 모두 입력해주세요.'
      raise serializers.ValidationError(msg, code='authorization')
    attrs['user'] = user
    return attrs
