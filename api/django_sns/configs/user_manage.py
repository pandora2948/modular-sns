from django.contrib.auth.models import BaseUserManager

"""
  유저 생성에 대한 권한을 모두 위임받는 클래스이며,
  유저를 생성할 수 있습니다.
"""
class UserManager(BaseUserManager):
    def create_user(self, username: str, email: str, password: str):
        if not username:
            raise ValueError('must be exists username')
        if not email:
            raise ValueError('must be exists email')
        if not password:
            raise ValueError('must be exists password')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save()
        return user

    def create_admin(self):
        pass
