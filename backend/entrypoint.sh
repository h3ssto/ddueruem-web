#!/bin/bash

apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io

while !</dev/tcp/db/5432; do echo "Connecting" && sleep 1; done;
python manage.py makemigrations
python manage.py migrate --run-syncdb
uwsgi --module ddueruemweb.wsgi --master --processes 1 --threads 1 --socket /tmp/uwsgi.sock --chmod-socket=666 &
nginx -g "daemon off;"
