from django.contrib.auth import authenticate
from rest_framework import serializers

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
        email = email,
        password = password
      )
      if not user:
        msg = '이메일 또는 비밀번호가 잘못되었습니다.'
        raise serializers.ValidationError(msg, code='authorization')
    else:
      msg = '이메일, 비밀번호 항목을 모두 입력해주세요.'
      raise serializers.ValidationError(msg, code='authorization')
    attrs['user'] = user
    return attrs
