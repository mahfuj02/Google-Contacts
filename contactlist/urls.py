from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('contacts', views.ContactViewSet)
router.register('labels', views.LabelViewSet)

urlpatterns = router.urls
