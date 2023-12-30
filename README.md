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
BIG NOTE: change the {react_server ip} to the ip address or host addresss of react_server 

```bash
apt-get update && apt-get install -y git python3 python3-pip python3.11-venv nano && bash -c 'cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass {react_server ip};
    }
}
EOF' && git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/FastAPI && rm -rf /home/FastAPI/frontend/ && cd /home/FastAPI/backend/ && python3 -m venv myenv && source myenv/bin/activate && pip install fastapi uvicorn && exit
```
Running the follwoing to start session of react_server

<pre>docker exec -it react_server /bin/bash </pre>

Now run the following command in react_server sesion:

```bash
apt-get update && apt install -y git ca-certificates curl gnupg && mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && apt-get update && apt-get install nodejs -y && git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/react && rm -rf /home/react/backend/ && cd /home/react/frontend/ && npm install axios && npm start
```




