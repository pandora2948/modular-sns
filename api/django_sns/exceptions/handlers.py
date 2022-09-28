from rest_framework.exceptions import (
  NotFound,
  AuthenticationFailed
)
from rest_framework.views import exception_handler
from ..views.auth import JWTLoginView


def application_exception_handler(exc, context):
  response = exception_handler(exc, context)
  print(context)
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

  return response
