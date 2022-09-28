from rest_framework.exceptions import (
    NotFound,
    AuthenticationFailed
)
from rest_framework.views import exception_handler
from ..views.auth import JWTLoginView

"""
  모든 예외(에러) 발생을 처리하는 함수입니다.
"""
def application_exception_handler(exc, context):
    response = exception_handler(exc, context)
    """
      NotFound 예외를 받아서 처리
    """
    if isinstance(exc, NotFound):
        del response.data['detail']
        response.data['message'] = ''
        response.data['error'] = 'target not exists'

    """
      login 요청 시 나는 AuthenticationFailed 예외를 받아서 처리
    """
    if isinstance(exc, AuthenticationFailed) and isinstance(context['view'], JWTLoginView):
        del response.data['detail']
        response.data['message'] = ''
        response.data['error'] = 'wrong password'

    return response # 예외를 모두 핸들링하고 반환합니다.
