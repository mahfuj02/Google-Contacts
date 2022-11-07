from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView, get_object_or_404, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import GoogleLoginSerializer, UserSerializer


class AbstractBaseLoginView(GenericAPIView):
    authentication_classes = []

    class Meta:
        abstract = True

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # logger.error(get_debug_str(request, request.user, serializer.errors))
            raise ValidationError(serializer.errors)

        user = serializer.validated_data.get('user')
        created = serializer.validated_data.get('created')

        """ If new user, create student and teacher object for the user """
        if created:
            pass

        user_serializer = UserSerializer(instance=user, context={'request': request})
        token, _ = Token.objects.get_or_create(user=user)

        resp = {
            'token': token.key,
            'created': created,
            'user_info': user_serializer.data
        }
        return Response(resp, status=status.HTTP_200_OK)


class GoogleLoginView(AbstractBaseLoginView):
    serializer_class = GoogleLoginSerializer
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class UserRetrieveUpdateAPI(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        pass

    def patch(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        for key, value in data.items():
            if key == "contact_no":
                user.contact_no = value
            if key == "address":
                user.address = value
        user.save()
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
