from django.db import models
from .user import User


class Following(models.Model):
    follwing_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='following'
    )
    follwer_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='follower'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'followings'

    def __str__(self):
        return 'following'
