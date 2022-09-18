from django.db import models

class User(models.Model):
  username = models.CharField(max_length=15, blank=False, unique=True)
  email = models.CharField(max_length=255, blank=False, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    app_label = 'src'
    db_table = 'users'

  def __str__(self):
    return self.username