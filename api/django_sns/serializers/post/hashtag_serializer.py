from rest_framework import serializers

from django_sns.models import Hashtag


class HashTagSerializer(serializers.Serializer):
    class Meta:
        model = Hashtag
        fields = '__all__'

    name = serializers.CharField(
        required=True,
        max_length=100,
    )
