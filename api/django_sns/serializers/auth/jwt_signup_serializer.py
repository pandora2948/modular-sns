from rest_framework import serializers

from django_sns.models import User


"""
  회원가입을 처리하는 DRF Serializer 클래스입니다.
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
