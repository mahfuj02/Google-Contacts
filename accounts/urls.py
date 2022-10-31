from django.urls import path
from .views import GoogleLoginView, UserRetrieveUpdateAPI

urlpatterns = [
    # path('login/google/', GoogleLoginView.as_view(), name="google-login"),
    path('login/google/', GoogleLoginView.as_view(), name='google_login'),
    path('user-info/', UserRetrieveUpdateAPI.as_view(), name='user-info'),

]
