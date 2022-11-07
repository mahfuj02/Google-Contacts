from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('contacts', views.ContactViewSet, basename="contacts")
router.register('labels', views.LabelViewSet, basename="label")

urlpatterns = router.urls
