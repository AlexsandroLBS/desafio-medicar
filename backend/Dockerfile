FROM python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

ADD ./requirements.txt /usr/src/app/requirements.txt

RUN pip install -r requirements.txt

ADD . /usr/src/app

EXPOSE 8000

CMD python manage.py makemigrations  && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
