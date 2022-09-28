from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from django_sns.serializers.auth import ModularSnsTokenObtainPairSerializer


class ModularSnsObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = ModularSnsTokenObtainPairSerializer
