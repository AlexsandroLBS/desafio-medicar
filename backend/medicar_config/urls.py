from django.contrib import admin
from django.urls import path, include
from medicar.views import MedicosViewSet, ConsultasViewSet, UsuariosViewSet, AgendaViewSet, EspecialidadesViewSet, ConsultasDeleteViewSet
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'usuarios', UsuariosViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('consultas/', ConsultasViewSet.as_view()),
    path('consultas/<int:id>/', ConsultasDeleteViewSet.as_view(), name='excluir_consulta'),
    path('agenda/', AgendaViewSet.as_view(), name='Agenda por médico'),
    path('medicos/', MedicosViewSet.as_view(), name='medicos por especialidade'),
    path('especialidades/', EspecialidadesViewSet.as_view(), name='Lista de especialidades'),
    
]
