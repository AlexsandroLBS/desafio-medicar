from datetime import datetime

from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from medicar.models import Agenda, Medico, Consulta, Usuario
from medicar.serializer import MedicoSerializer, ConsultaSerializer, UsuarioSerializer, AgendaSerializer

class LoginViewSet(generics.ListCreateAPIView):
    serializer_class = UsuarioSerializer

    def post(self, request):
        nome = request.data.get('nome')
        senha = request.data.get('senha')
        email = request.data.get('email')

        # Verificar se as credenciais são fornecidas
        if (not nome and not email) or not senha:
            return Response({'message': 'Forneça um nome de usuário ou e-mail e uma senha'})

        # Verificar se o usuário existe no banco de dados
        if nome:
            user = Usuario.objects.filter(nome=nome, senha = senha).first()
        else:
            user = Usuario.objects.filter(email=email, senha = senha).first()

        if not user:
            return Response({'message': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SignUpViewSet(generics.ListCreateAPIView):
    serializer_class = UsuarioSerializer 
    def post(self, request):
        nome = request.data.get('nome')
        email = request.data.get('email')
        senha = request.data.get('senha')
        if not (Usuario.objects.filter(nome=nome) or Usuario.objects.filter(email=email)):
            usuario = Usuario.objects.create(
                    nome = nome,
                    email = email,
                    senha = senha
                )
            serializer = self.get_serializer(usuario)
            return Response(serializer.data)
        if (Usuario.objects.filter(nome=nome) and Usuario.objects.filter(email=email)):
            return Response({'error':'Usuário e email já cadastrados'})
        elif Usuario.objects.filter(nome=nome):
            return Response({'error':'Usuário  já cadastrado'})
        elif Usuario.objects.filter(email=email):
            return Response({'error':'Email  já cadastrado'})
        else: 
            return Response({'error':'Error ao inserir usuario'})


class EspecialidadesViewSet(APIView):
    def get(self, request):
        current_datetime = timezone.now()
        dia_atual = current_datetime.date()
        hora_atual = current_datetime.time()
        agendas = Agenda.objects.all()
        agendas = agendas.exclude(horarios=[])
        especialidades = []
        for agenda in agendas:
            horarios_filtrados = []
            for horario in agenda.horarios:
                if datetime.combine(agenda.dia, horario) >= datetime.combine(dia_atual, hora_atual):
                    if not Consulta.objects.filter(dia=agenda.dia, horario=horario, medico=agenda.medico).exists():
                        horarios_filtrados.append(horario.strftime('%H:%M'))
            if horarios_filtrados:
                especialidades.append(agenda.medico.especialidade)
        if especialidades:
            return Response({'especialidades': especialidades})
        else:
            return Response({'error': 'Não há nenhuma consulta disponivel'})


class MedicoEspecialidade(APIView):
    def get(self, request):
        id = self.request.query_params.get('id')
        if id:
            medico = get_object_or_404(Medico, id=id)
            serializer = MedicoSerializer(medico)
            return Response(serializer.data)
        return Response({'error':'Medico não encontrado'})


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
            agenda.horarios.remove(horario)
            agenda.save()
            serializer = self.get_serializer(consulta)
            return Response(serializer.data)
        return Response({'error': 'Horário indisponível'}, status=400)     


class ConsultasDeleteViewSet(generics.DestroyAPIView):
    serializer_class = ConsultaSerializer
    def destroy(self, *args, **kwargs):
        current_datetime = timezone.now()
        dia_atual = current_datetime.date()
        hora_atual = current_datetime.time()
        consulta_id = kwargs['id']
        consulta = get_object_or_404(Consulta, id=consulta_id)
        if datetime.combine(consulta.dia, consulta.horario) >= datetime.combine(dia_atual, hora_atual):
            agenda = get_object_or_404(Agenda, dia = consulta.dia, medico = consulta.medico)
            agenda.horarios.append(consulta.horario)
            agenda.save()
            consulta.delete()
            return HttpResponse(status=204)
        else:
            return Response({'error': 'Consulta já aconteceu'}, status=400) 


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
                        horarios_filtrados.append(horario.strftime('%H:%M'))
            if horarios_filtrados:
                agenda_dict = {
                    'id': agenda.id,
                    'medico': {
                        'id': agenda.medico.id,
                        'crm': agenda.medico.crm,
                        'nome': agenda.medico.nome,
                        'email': agenda.medico.email,
                        'especialidade': agenda.medico.especialidade
                    },
                    'dia': str(agenda.dia),
                    'horarios': horarios_filtrados
                }
                agendas_filtradas.append(agenda_dict)

        serializer = AgendaSerializer(agendas_filtradas, many=True)
        return Response(serializer.data)