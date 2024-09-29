---
title: "docker启动apache静态服务器"
date: 2024-09-29T18:39:20
tags: ['docker']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/25"
---

最近在部署vite的静态项目需要用到apache

docker-compose.yaml
```
services:
  apache:
    image: httpd:latest
    container_name: apache_container
    ports:
      - "8888:80"
    volumes:
      - /Users/ll/Desktop/2024/vite-vue-mks/dist:/usr/local/apache2/htdocs
      - ./httpd.conf:/usr/local/apache2/conf/httpd.conf
    restart: always
    command: /bin/bash -c "cat /usr/local/apache2/conf/httpd.conf && httpd-foreground"

```

httpd.conf

```
# 包含原始配置
Include conf/original/httpd.conf
LoadModule rewrite_module modules/mod_rewrite.so

# 启用 .htaccess
<Directory "/usr/local/apache2/htdocs">
    AllowOverride All
    Require all granted
</Directory>
```