from django.db import models

class User(models.Model):
  username = models.CharField(max_length=15, blank=False, unique=True)
  email = models.CharField(max_length=255, blank=False, unique=True)
  password = models.CharField(max_length=255, blank=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    db_table = 'users'

  def __str__(self):
    return self.username
