---
title: "Caddy 配置自动配置https 和 docker启动ssh"
date: 2024-09-23T08:57:42
tags: ['docker']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/15"
---


# Caddy 配置自动配置https 和 docker启动ssh

Caddyfile
~~~
go.kenhong.com {
	root * /srv
    encode {
        zstd
        gzip 9
    }
	file_server
}

~~~

docker-compose.yml
~~~
version: '3.2'

services:
  openssh-server:
    image: linuxserver/openssh-server:latest
    container_name: openssh-server
    hostname: openssh-server #optional
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - SUDO_ACCESS=false #optional
      - PASSWORD_ACCESS=true #optional
      - USER_PASSWORD=${USER_PASSWORD}
      - USER_NAME=${USER_NAME} #optional
    volumes:
      - ./config:/config
      - ./www:/config/www
    ports:
      - ${SSH_PORT}:2222
    restart: unless-stopped

  caddy:
    image: caddy:2-alpine
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./www:/srv
      - ./caddy_data:/data
      - ./caddy_config:/config


~~~


