from django.contrib import admin
from medicar.models import *

class Usuarios(admin.ModelAdmin):
    list_display = ('id', 'nome', 'senha')
    list_display_links = ('id', 'nome')
    search_fields = ('id', 'nome')

class Medicos(admin.ModelAdmin):
    list_display = ('id', 'nome', 'crm', 'email')
    list_display_links = ('id', 'nome')
    search_fields = ('id', 'nome', 'crm', 'email')

class Agendas(admin.ModelAdmin):
    list_display = ('id', 'medico', 'dia', 'horarios')
    

admin.site.register(Medico, Medicos)
admin.site.register(Usuario, Usuarios)
admin.site.register(Agenda, Agendas)