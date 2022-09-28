from django.db import models
from .post import Post


class UploadFile(models.Model):
    dir = models.CharField(max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        db_table = 'files'

    def __str__(self):
        return self.dir
