from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class ListItems(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    id = models.BigIntegerField(primary_key=True)
    # Text field because the text can be huge
    text = models.TextField()
    purchased = models.BooleanField()

    def __str__(self):
        return f"{self.id}, {self.user}, {self.text}, {self.purchased}"
