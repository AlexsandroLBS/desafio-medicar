from django.contrib import admin
from django.urls import path
from medicar.views import MedicosViewSet, ConsultasViewSet, SignUpViewSet, AgendaViewSet, EspecialidadesViewSet, MedicoEspecialidade, ConsultasDeleteViewSet, LoginViewSet


urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_account/', SignUpViewSet.as_view()),
    path('login/', LoginViewSet.as_view()),
    path('consultas/', ConsultasViewSet.as_view()),
    path('consultas/<int:id>/', ConsultasDeleteViewSet.as_view(), name='excluir_consulta'),
    path('agendas/', AgendaViewSet.as_view(), name='Agenda por médico'),
    path('medicos/', MedicosViewSet.as_view(), name='Médicos por especialidade'),
    path('medico/', MedicoEspecialidade.as_view(), name='Especialidade por médico'),
    path('especialidades/', EspecialidadesViewSet.as_view(), name='Lista de especialidades'),
]
