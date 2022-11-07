from rest_framework import serializers
from .models import Contact, Label


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ['id', 'title']


class SimpleContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'title', 'email', 'phone', 'image', 'label']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'title', 'email', 'phone', 'image', 'label']

    label = LabelSerializer(many=True)
