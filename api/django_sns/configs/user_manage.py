from django.contrib.auth.models import BaseUserManager


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
