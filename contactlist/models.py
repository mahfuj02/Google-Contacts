from django.db import models
from django.db import models
from django.conf import settings


# Create your models here.
class Label(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title


class Contact(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='profile', null=True, blank=True)
    label = models.ManyToManyField(Label,
                                   related_name='contacts',
                                   null=True,
                                   blank=True,
                                   )

    class Meta:
        db_table = "contact"

    def __str__(self):
        return self.title
