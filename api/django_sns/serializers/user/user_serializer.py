from rest_framework import serializers
from django_sns.models import User


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'created_at']

    username = serializers.CharField(
        max_length=15,
        allow_blank=False,
        required=True,
        write_only=True,
    )
    email = serializers.EmailField(
        max_length=255,
        allow_blank=False,
        required=True,
        write_only=True,
    )

    created_at = serializers.DateTimeField()
