# Medicar

This project is a full stack application made with [Django](https://www.djangoproject.com), [DRF](https://www.django-rest-framework.org) (Django Rest Framework) and [Angular](https://angular.io).  All application is running in a [Docker](https://www.docker.com) container.

## Running

To execute the application, you need to be in project root path and run:

```
docker-compose up
```

For creating a super user access, run:

```
docker-compose run api python manage.py createsuperuser
```

After that, front will be available at:
 - http://localhost:4200/ 
and API at:
 - http://localhost:8000/


Go to http://localhost:8000/admin to access [Django Admin Site](https://docs.djangoproject.com/en/4.1/ref/contrib/admin/)
## API Docs

#### To all scheduled appointments

```http
  GET /consultas
```
#### Return
```json
[
    {
        "id": 1,
        "dia": "2023-03-12",
        "horario": "14:00",
        "data_agendamento": "2023-03-08T13:10:15.783286-03:00",
        "medico": {
            "id": 1,
            "nome": "Dr Alexsandro Lopes",
            "crm": 1234,
            "email": "alexsandro@gmail.com",
            "especialidade": "Cardiologia"
        }
    },
    {
        "id": 2,
        "dia": "2023-03-15",
        "horario": "17:00",
        "data_agendamento": "2023-03-06T14:10:25.233616-01:00",
        "medico": {
            "id": 2,
            "nome": "Dr Pedro",
            "crm": 4123,
            "email": "pedro@gmail.com",
            "especialidade": "Radiologia"
        }
    }
]
```

-----
#### To make an appointment


```http
  POST /consultas/
```


| Parameter   | Type       | Description                         | Example   |
| :---------- | :--------- | :-----------------------------------| :---------| 
| `agenda_id` | `string`   | **Mandatory**. The schedule ID      |1          | 
| `horario`   | `string`   | **Mandatory**. The appointment time |"14:00"    | 

#### Return
```json
[
    {
        "id": 1,
        "dia": "2023-03-12",
        "horario": "14:00",
        "data_agendamento": "2023-03-08T13:10:15.783286-03:00",
        "medico": {
            "id": 1,
            "nome": "Alexsandro Lopes",
            "crm": 1234,
            "email": "alexsandro@gmail.com",
            "especialidade": "Cardiologia"
        }
    }
]
```

-----------
#### To delete a scheduled appointment
```http
  DELETE /consultas/:id
```
#### There is no return
## Referência
This project took as reference the developer challenge from Intmed
 - [Desafio Intmed](https://github.com/Intmed-Software/desafio)

