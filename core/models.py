from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin
from allauth.socialaccount.models import SocialAccount

# from django.utils.translation import gettext_lazy as _


# Create your models here.
class User(AbstractUser):
    # email = models.EmailField(max_length=255, unique=True)
    # first_name = models.CharField(max_length=255)
    # last_name = models.CharField(max_length=255)
    # is_active = models.BooleanField(default=False)
    # is_staff = models.BooleanField(default=False)
    #
    # objects = UserManager()
    #
    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_google_profile_data(self):
        social_account = SocialAccount.objects.filter(user=self).first()
        try:
            return social_account.extra_data
        except (AttributeError, Exception):
            return {}


# class UserManager(models.Model):
#     # def create_user(self, email, password=None, **kwargs):
#     #     if not email:
#     #         raise ValueError("Users must have an email address")
#     #     email = self.normalize_email(email)
#     #     user = self.model(email=email, **kwargs)
#     #     user.set_password(password)
#     #     user.save()
#     #     return user
#     user = models.OneToOneField(
#         verbose_name=_('User'),
#         related_name='profile',
#         to=('User'),
#         on_delete=models.CASCADE
#     )
#     full_name = models.CharField(verbose_name=_('Full Name'), max_length=128)
#
#     def get_full_name(self):
#         return f"{self.full_name}"
