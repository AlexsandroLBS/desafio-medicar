from django.contrib import admin
from django.urls import path
from medicar.views import MedicosViewSet, ConsultasViewSet, SignUpViewSet, AgendaViewSet, EspecialidadesViewSet, ConsultasDeleteViewSet, LoginViewSet


urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_account/', SignUpViewSet.as_view()),
    path('login/', LoginViewSet.as_view()),
    path('consultas/', ConsultasViewSet.as_view()),
    path('consultas/<int:id>/', ConsultasDeleteViewSet.as_view(), name='excluir_consulta'),
    path('agenda/', AgendaViewSet.as_view(), name='Agenda por médico'),
    path('medicos/', MedicosViewSet.as_view(), name='medicos por especialidade'),
    path('especialidades/', EspecialidadesViewSet.as_view(), name='Lista de especialidades'),
]
