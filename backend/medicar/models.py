from django.db import models
from django.contrib.postgres.fields import ArrayField

class Usuario(models.Model):
    nome = models.CharField(unique=True, max_length=20)
    senha = models.CharField(null=False, max_length=20)

    def __str__(self):
        return self.nome


class Medico(models.Model):
    nome = models.CharField(unique=True, max_length=20)
    crm = models.IntegerField(unique=True)
    email = models.CharField(null=True, max_length=100)
    especialidade = models.CharField( max_length=20)

    def __str__(self):
        return self.nome


class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    dia = models.DateField(null=False)
    horarios = ArrayField(models.TimeField())
    
    class Meta:
        unique_together = ('medico', 'dia')

class Consulta(models.Model):
    dia = models.DateField(null=False)
    horario = models.TimeField(null=False)
    data_agendamento = models.DateTimeField(null=False)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)