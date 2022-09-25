from django.db import models
from .post import Post

class Hashtag(models.Model):
  name = models.CharField(max_length=100)

  class Meta:
    db_table = 'hashtags'

  def __str__(self):
    return self.name


class PostHashTag(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  hashtag = models.ForeignKey(Hashtag, on_delete=models.CASCADE)

  class Meta:
    db_table = 'post_conn_hashtag'

  def __str__(self):
    return 'post_conn_hashtag'
