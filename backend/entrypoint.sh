#!/bin/bash

while !</dev/tcp/db/5432; do echo "Connecting" && sleep 1; done;
python manage.py makemigrations
python manage.py migrate --run-syncdb
uwsgi --module ddueruemweb.wsgi --master --processes 1 --threads 1 --socket /tmp/uwsgi.sock --chmod-socket=666 &
nginx -g "daemon off;"
