from django.http import JsonResponse
from rest_framework import views, status
from rest_framework.permissions import AllowAny

from django_sns.serializers.auth import JWTLoginSerializer


# 로그인을 처리하는 DRF view 클래스입니다.
class JWTLoginView(views.APIView):
    permission_classes = [AllowAny]
    serializer_class = JWTLoginSerializer

    def post(self, req):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid(raise_exception=False): # 요청 데이터가 유효하다면
            user = serializer.validated_data['user']
            refresh = serializer.validated_data['refresh']
            access = serializer.validated_data['access']
            return JsonResponse(
                {
                    'data': {
                        'user': user,
                        'refresh': refresh,
                        'access': access
                    }
                },
                status=status.HTTP_200_OK
            )
