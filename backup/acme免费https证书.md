---
title: "acme免费https证书"
date: 2024-09-23T08:38:39
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/6"
---

# 安装

## 国内不可用
```sh
curl https://get.acme.sh | sh
```

## 国内可用
```sh
git clone https://gitee.com/neilpang/acme.sh.git
cd acme.sh
./acme.sh --install -m my@example.com
```

# 申请证书
```sh
./acme.sh --issue -d go.kenhong.com -w /root/ftp_nginx/www
```

配置 Nginx 可以访问 `/root/ftp_nginx/www`

```
[Wed Oct 18 02:52:53 AM CST 2023] Your cert is in: /root/.acme.sh/go.kenhong.com/go.kenhong.com.cer
[Wed Oct 18 02:52:53 AM CST 2023] Your cert key is in: /root/.acme.sh/go.kenhong.com/go.kenhong.com.key
[Wed Oct 18 02:52:53 AM CST 2023] The intermediate CA cert is in: /root/.acme.sh/go.kenhong.com/ca.cer
[Wed Oct 18 02:52:53 AM CST 2023] And the full chain certs is there: /root/.acme.sh/go.kenhong.com/fullchain.cer
```

看到以上信息表示成功。

## 另一种更方便的方式
直接将自己当成 web 服务器进行申请：
```sh
acme.sh --issue -d go.kenhong.com --standalone
```

# 一键部署

保存为 `docker-compose.yml` 文件：

```yaml
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

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./www:/usr/share/nginx/html
      - /root/.acme.sh/go.kenhong.com:/etc/nginx/certs
      - ./default.conf:/etc/nginx/conf.d/default.conf
```

## 无 HTTPS 证书的 Nginx 配置
`default.conf` 文件：

```nginx
server {
  listen 80;
  server_name _;

  location / {
    root   /usr/share/nginx/html;
    index  index.html;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

## 有 HTTPS 证书的 Nginx 配置
`default.conf` 文件：

```nginx
server {
    listen 80;
    server_name go.kenhong.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name go.kenhong.com;

    ssl_certificate /etc/nginx/certs/fullchain.cer;
    ssl_certificate_key /etc/nginx/certs/go.kenhong.com.key;

    gzip on;
    gzip_disable "msie6";

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 9;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        if ($host != "go.kenhong.com") {
            return 444;
        }
    }
}
```

# 更新证书

```sh
acme.sh --renew -d go.kenhong.com --force
```

# 一键安装证书

```sh
acme.sh --installcert -d go.kenhong.com \
        --key-file /etc/nginx/certs/go.kenhong.com.rsa.key \
        --fullchain-file /etc/nginx/certs/go.kenhong.com.rsa.crt \
        --reloadcmd "systemctl reload nginx"
```

# 使用 Caddy 上面的操作都免了~

## Caddyfile 配置

```caddyfile
go.kenhong.com {
    root * /srv
    encode {
        zstd
        gzip 9
    }
    file_server
}
```

## docker-compose.yml 配置

```yaml
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
```