FROM python:3
RUN apt update && apt install -y nginx \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt update && apt install -y docker-ce \
		docker-ce-cli \ 
		containerd.io
ADD . /api
COPY ./ddueruemweb/.env.production /api/ddueruemweb/.env
WORKDIR /api

# This is for the performant prod server
RUN pip install uwsgi
RUN pip install -r requirements.txt
ENV PORT=8000
EXPOSE 8000

RUN ./manage.py collectstatic --no-input

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY uwsgi_params.conf /etc/uwsgi/sites/uwsgi_params
CMD ["./entrypoint.sh"]
