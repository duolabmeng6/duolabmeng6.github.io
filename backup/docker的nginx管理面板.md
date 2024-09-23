---
title: "docker的nginx管理面板"
date: 2024-09-23T08:57:04
tags: ['docker']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/14"
---

# docker的nginx管理面板


[NginxProxyManager/nginx-proxy-manager: Docker container for managing Nginx proxy hosts with a simple, powerful interface (github.com)](https://github.com/NginxProxyManager/nginx-proxy-manager)
# 英文版本
```
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```
# 中文版本
[xiaoxinpro/nginx-proxy-manager-zh: 基于nginx-proxy-manager翻译的中文版本 (github.com)](https://github.com/xiaoxinpro/nginx-proxy-manager-zh)

```
version: '3.8'
services:
  app:
    image:  'chishin/nginx-proxy-manager-zh:release'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```






# 禁止ip访问 只允许域名
```
nginx_proxy/data/nginx/custom/http_top.conf 内容 server {
    listen 80 default_server;
    listen [::] default_server;
    server_name _;
    return 444; 
}
```