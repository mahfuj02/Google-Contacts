from  django.urls import include


from django.contrib import admin
from django.urls import path


urlpatterns = [

    path('admin/', admin.site.urls),
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    path('__debug__/', include('debug_toolbar.urls')),
    # path('auth/', include('djoser.social.urls')),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('contactlist.urls')),
    path('', include('accounts.urls')),

]
