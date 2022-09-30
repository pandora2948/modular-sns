from rest_framework.exceptions import (
    NotFound,
    AuthenticationFailed,
    NotAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import exception_handler
from ..views.auth import JWTLoginView


def del_detail(response: Response):
    del response.data['detail']


#  모든 예외(에러) 발생을 처리하는 함수입니다.
def application_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, NotAuthenticated):  # 인증되지 않은 요청 예외 처리
        del_detail(response)
        response.data['error'] = 'not authenticated'

    if isinstance(exc, NotFound):  # 찾을 수 없는 대상에 대한 예외 처리
        del response.data['detail']
        response.data['message'] = ''
        response.data['error'] = 'target not exists'

    # 패스워드 오류 예외 처리
    if isinstance(exc, AuthenticationFailed) and isinstance(context['view'], JWTLoginView):
        del response.data['detail']
        response.data['message'] = ''
        response.data['error'] = 'wrong password'

    return response
