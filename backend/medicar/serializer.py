from rest_framework import serializers
from medicar.models import Medico, Consulta, Usuario, Agenda


class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = ['id', 'nome', 'crm', 'email', 'especialidade']

class EspecialidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = ['especialidade']

class ConsultaSerializer(serializers.ModelSerializer):
    horario = serializers.TimeField(format='%H:%M')
    medico = MedicoSerializer()
    class Meta:
        model = Consulta
        fields = ['id', 'dia', 'horario', 'data_agendamento', 'medico']
        

class ConsultaCreateSerializer(serializers.ModelSerializer):
    horario = serializers.TimeField(format='%H:%M')
    medico = MedicoSerializer()

    class Meta:
        model = Consulta
        fields = ['id', 'medico', 'dia', 'horario']
        

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    class Meta:
        model = Agenda
        fields = ['id', 'medico', 'horarios', 'dia']


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email']