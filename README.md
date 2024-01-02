# Environment Setup

## Introduction
Firstly, this guide assumes you are using a Debian-based system, and the entire process will be carried out through the command-line interface (CLI).

---
---

## Setup a docker on your host machine , they are many guides and video tutorials that can help you on hwo to setup a docker 

setup two docker containers , a nginx server and a debian 

and i have for my comfort setup a mcvlan network and connected each of the container to it , u can do so by following the [guide](https://docs.docker.com/network/drivers/macvlan/), if you are setting up a mcvlan ensure your network interface supports promiscuous mode

NOTE: if you dont really want to create a mcvlan remove the [[ --network  {mcvlan network name}]] from the below commands and u have to open up separate ports for each of the containers so than the fast_api json file can be dumped on a host port and ngnix is also hosted on its own port which establishes reverse proxy connection to  react web application which again is hosted on a separate port. Therefore each application have same ip but hosted on different ports.

```bash
docker run --name nginx_fastapi --network {mcvlanNetwork} -itd nginx
```

```bash
docker run --name  react_server --network {mcvlanNetwork} -itd debian
```


---

## Nginx and fatsapi configuration:


start an interactive session with nginx_fastapi:

```bash
docker exec -it nginx_fastapi /bin/bash 
```

## THE NOTE OF ETERNITY:
Ahm Ahm, please do note that having a blank access.log file will result in [fastapi ip]/logs to never load , and yea I didnt have the patience to add a exception to return error when access.log file is blank so if u run into that issue solve it by using benchmark on the nginx host ip and again if it still persist to not show logs, than my guy u have run into the fatal unknown error of linux realm that transcendence the mind of Noobed-max(basically i cant explain) but I am who i am the saviour ofc so here's the solution: force remove the access.log directory and restart nginx and use benchmark again before starting the lame main.py, and viola my pupils u got it working(i hope so if not , goodluck and goodbye 
---

Now run the following command in nginx_fastapi sesion

BIG NOTE: change the {react_server ip} to the ip address or host addresss of react_server i.e the address provided when u run the react application in the below React_server configuration guide
---

```bash
apt-get update && apt-get install -y git python3 python3-pip python3.11-venv nano iproute2 && bash -c 'cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass {react_server ip};
    }
}
EOF' && git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/FastAPI && rm -rf /home/FastAPI/frontend/ && cd /home/FastAPI/backend/ && python3 -m venv myenv && source myenv/bin/activate && pip install fastapi uvicorn cors && sudo rm -f /var/log/nginx/* && nginx -s reload
```

---

## react_server configuration:

Running the follwoing to start session of react_server

```bash
docker exec -it react_server /bin/bash 
```

Now run the following command in react_server sesion:

```bash
apt-get update && apt install -y git ca-certificates curl gnupg apache2 iproute2 && mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && apt-get update && apt-get install nodejs -y && git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/react && rm -rf /home/react/backend/ && cd /home/react/frontend/ && npm install axios 
```
you would obtain a address in terminal session redirecting to react web application copy the address and paste it in place of {ract_server ip} in the Nginx and fatsapi configuration: pasrt.



