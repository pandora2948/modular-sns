from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from ..configs import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        verbose_name='사용자 이름 (username)',
        max_length=15,
        blank=False,
        unique=True
    )
    email = models.CharField(
        verbose_name='이메일 (email)',
        max_length=255,
        blank=False,
        unique=True
    )
    password = models.CharField(
        verbose_name='비밀번호 (password)',
        max_length=255,
        blank=False
    )
    created_at = models.DateTimeField(
        verbose_name='생성일자 (created_at)',
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name='수정일자 (updated_at)',
        auto_now=True
    )

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    class Meta:
        db_table = 'users'
        ordering = ['created_at']

    def __str__(self):
        return self.username

    @property
    def is_admin(self):
        return self.is_superuser
