from datetime import datetime

from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from medicar.models import Agenda, Medico, Consulta, Usuario
from medicar.serializer import MedicoSerializer, ConsultaSerializer, UsuarioSerializer, AgendaSerializer, EspecialidadesSerializer


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer  


class EspecialidadesViewSet(generics.ListCreateAPIView):
    serializer_class = EspecialidadesSerializer
    def get_queryset(self):
        queryset = Medico.objects.all()
        queryset = set(queryset)
        return queryset


class MedicosViewSet(generics.ListCreateAPIView):
    serializer_class = MedicoSerializer

    def get_queryset(self):
        queryset = Medico.objects.all()
        especialidade = self.request.query_params.get('especialidade')
        if especialidade:
            queryset = queryset.filter(especialidade=especialidade)
        return queryset


class ConsultasViewSet(generics.ListCreateAPIView):
    serializer_class = ConsultaSerializer

    def get_queryset(self):
        current_datetime = timezone.now()
        dia_atual = current_datetime.date()
        hora_atual = current_datetime.time()
        queryset = Consulta.objects.filter(dia__gte=dia_atual)
        queryset = queryset.exclude(dia=dia_atual, horario__lt=hora_atual).order_by('dia', 'horario')
        return queryset  

    def post(self, request):
        agenda_id = request.data.get('agenda_id')
        horario = request.data.get('horario')
        time_obj = datetime.strptime(horario, "%H:%M")
        horario = time_obj.time()
        agenda = Agenda.objects.get(id=agenda_id)
        if horario in agenda.horarios:
            medico = agenda.medico
            consulta = Consulta.objects.create(
                dia=agenda.dia,
                horario=horario,
                data_agendamento=timezone.now(),
                medico=medico
            )
            serializer = self.get_serializer(consulta)
            return Response(serializer.data)
        return Response({'error': 'Horário indisponível'}, status=400)     


class ConsultasDeleteViewSet(generics.DestroyAPIView):
    serializer_class = ConsultaSerializer
    def destroy(self, *args, **kwargs):
            consulta_id = kwargs['id']
            consulta = get_object_or_404(Consulta, id=consulta_id)
            consulta.delete()
            return HttpResponse(status=204)


class AgendaViewSet(APIView):
    def get(self, request):

        current_datetime = timezone.now()
        dia_atual = current_datetime.date()
        hora_atual = current_datetime.time()

        medicos_ids = request.GET.getlist('medico_id')
        crm = request.GET.getlist('crm')
        data_inicio = request.GET.get('data_inicio')
        data_fim = request.GET.get('data_fim')
        agendas = Agenda.objects.all()
        agendas = agendas.exclude(horarios=[])

        if medicos_ids:
            agendas = agendas.filter(medico__id__in=medicos_ids)
        if crm:
            agendas = agendas.filter(medico__crm__in=crm)
        if data_inicio:
            agendas = agendas.filter(dia__gte=data_inicio)
        if data_fim:
            agendas = agendas.filter(dia__lte=data_fim)

        agendas_filtradas = []
        for agenda in agendas:
            horarios_filtrados = []
            for horario in agenda.horarios:
                if datetime.combine(agenda.dia, horario) >= datetime.combine(dia_atual, hora_atual):
                    if not Consulta.objects.filter(dia=agenda.dia, horario=horario, medico=agenda.medico).exists():
                        horarios_filtrados.append(horario)
            if horarios_filtrados:
                agenda_dict = {
                    'id': agenda.id,
                    'medico': {
                        'id': agenda.medico.id,
                        'crm': agenda.medico.crm,
                        'nome': agenda.medico.nome,
                        'email': agenda.medico.email
                    },
                    'dia': str(agenda.dia),
                    'horarios': horarios_filtrados
                }
                agendas_filtradas.append(agenda_dict)

        serializer = AgendaSerializer(agendas_filtradas, many=True)
        return Response(serializer.data)