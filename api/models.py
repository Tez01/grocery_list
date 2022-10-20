from django.db import models

# Create your models here.


class ListItems(models.Model):
    id = models.IntegerField(primary_key=True)
    # Text field because the text can be huge
    text = models.TextField()
    purchased = models.BooleanField()
