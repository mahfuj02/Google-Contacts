from django.contrib import admin
from .models import Contact, Label


@admin.register(Contact, site=None)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'email', 'phone']


class LabelAdmin(admin.ModelAdmin):
    pass


admin.site.register(Label, LabelAdmin)
