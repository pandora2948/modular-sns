from django.db import models
from .post import Post
from .user import User

class PostLiker(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  class Meta:
    db_table = 'post_likers'

  def __str__(self):
    return 'post_liker'
