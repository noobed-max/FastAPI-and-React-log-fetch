#!/bin/bash

# Install Python 3, python3-pip, nano
sudo apt-get update
sudo apt-get install -y python3 python3-pip nano

# Replace default.conf in /etc/nginx/conf.d/
sudo bash -c 'cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://192.168.29.3:3000;
    }
}
EOF'

# Clone the repository
git clone https://github.com/noobed-max/FastAPI-and-React-log-fetch.git /home/

# Remove the frontend directory
rm -rf /home/FastAPI-and-React-log-fetch/frontend/

# Change to the frontend directory
cd /home/FastAPI-and-React-log-fetch/frontend/

# Create a Python virtual environment
python3 -m venv myenv
