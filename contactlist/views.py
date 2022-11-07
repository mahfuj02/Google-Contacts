from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from .models import Contact, Label
from .serializers import ContactSerializer, LabelSerializer, SimpleContactSerializer


# Create your views here.
class ContactViewSet(ModelViewSet):
    # filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filter_fields = ['label_id', 'email']
    # search_fields = ['title', 'email', 'phone']
    # ordering_fields = ['title', 'email']

    def perform_create(self, serializer):
        print(serializer)
        serializer.save(user=self.request.user)

    def get_queryset(self):
        query_set = Contact.objects.filter(user=self.request.user)
        return query_set

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ContactSerializer
        return SimpleContactSerializer


class LabelViewSet(ModelViewSet):
    serializer_class = LabelSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        query_set = Label.objects.filter(user=self.request.user)
        return query_set

# eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NTY2ODc5LCJpYXQiOjE2NjY0ODA0NzksImp0aSI6ImNmMmUwNDYxYzA5YjRmN2RiYjQ3YTA4ZTgwYTJmYzhjIiwidXNlcl9pZCI6MX0.Wm21SMdcx6JmavVepG-NTDawy1bnlUzoaHYivYMa7oo
