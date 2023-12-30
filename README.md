# Environment Setup

## Introduction
Firstly, this guide assumes you are using a Debian-based system, and the entire process will be carried out through the command-line interface (CLI).

Setup a docker on your host machine , they are many guides and video tutorials that can help you on hwo to setup a docker 
---

---

setup two docker containers , a nginx sserver and a debian 

<pre>docker run --name nginx_fastapi --network {mcvlan network name} -itd nginx </pre>

<pre>docker run --name  react_server --network {mcvlan network name} -itd debian </pre>

start an interactive session with nginx_fastapi:

<pre>docker exec -it nginx_fastapi /bin/bash </pre>

Now run the following command in nginx_fastapi sesion

<pre> apt-get update && apt-get install -y git python3 python3-pip python3.11-venv nano && bash -c 'cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://192.168.29.3:3000;
    }
}
EOF' && git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/FastAPI && rm -rf /home/FastAPI/frontend/ && cd /home/FastAPI/backend/ && python3 -m venv myenv && source myenv/bin/activate && pip install fastapi uvicorn 
</pre>
