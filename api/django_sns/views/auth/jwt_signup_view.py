from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import views
from django_sns.models import User
from django_sns.serializers.auth import JWTSignupSerializer


#    회원가입을 처리하는 DRF view 클래스입니다.
class JWTSignupView(views.APIView):
    permission_classes = [AllowAny, ]
    serializer_class = JWTSignupSerializer

    def post(self, req):
        serializer = self.serializer_class(data=req.data)

        try:
            if serializer.is_valid(raise_exception=True):  # 모든 데이터가 유효하다면
                serializer.save(req)
                user: User | None = User.objects.get(username=req.data['username'])
                token = RefreshToken.for_user(user)
                refresh = str(token)
                access = str(token.access_token)
                return JsonResponse({
                    'message': '회원가입에 성공하였습니다.',
                    'data': {
                        'user': req.data['username'],
                        'access': access,
                        'refresh': refresh
                    }
                }, status=status.HTTP_200_OK)
        except ValidationError as e:  # 예외 발생 시 (from line 19)
            err_message: str = "".join("".join(v) for v in e.detail.values())
            return JsonResponse(
                data={
                    "error": err_message,
                },
                status=e.status_code
            )
