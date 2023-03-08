from django.contrib import admin
from medicar.models import *
from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone

class Usuarios(admin.ModelAdmin):
    list_display = ('id', 'nome', 'senha')
    list_display_links = ('id', 'nome')
    search_fields = ('id', 'nome')

class Medicos(admin.ModelAdmin):
    list_display = ('id', 'nome', 'crm', 'email')
    list_display_links = ('id', 'nome')
    search_fields = ('id', 'nome', 'crm', 'email')


class AgendaForm(forms.ModelForm):
    class Meta:
        model = Agenda
        fields = '__all__'

    def clean_dia(self):
        dia = self.cleaned_data['dia']
        if dia <= timezone.localdate():
            raise ValidationError("A data da agenda deve ser uma data futura.")
        return dia
    

class Agendas(admin.ModelAdmin):
    list_display = ('id', 'medico', 'dia', 'horarios')
    form = AgendaForm

admin.site.register(Medico, Medicos)
admin.site.register(Usuario, Usuarios)
admin.site.register(Agenda, Agendas)