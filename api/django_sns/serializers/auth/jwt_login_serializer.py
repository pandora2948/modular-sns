from rest_framework import serializers
from rest_framework.exceptions import NotFound, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from django_sns.models import User


"""
    로그인을 처리하는 DRF serializer 클래스입니다.
"""
class JWTLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

    email = serializers.EmailField(required=True, write_only=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    # 사용자에게 제공할 정보를 dict 형태로 반환합니다.
    def serialize_user(self, user):
        dict_user = user.__dict__
        return {
            'username': dict_user['username'],
            'email': dict_user['email']
        }

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        print(f'email: {email}, password: {password}')

        user_find_query = User.objects.filter(email=email)
        if not user_find_query.exists():
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
