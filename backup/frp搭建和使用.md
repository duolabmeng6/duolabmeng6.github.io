---
title: "frp搭建和使用"
date: 2024-09-23T08:45:56
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/9"
---

# frp搭建和使用

# server

docker-compose.yaml

```
version: "3"

services:

 frps:

 container\_name: frps

 image: snowdreamtech/frps:0.56.0

 network\_mode: host

 volumes:

- ./frps.toml:/etc/frp/frps.toml
```
 frps.toml 
```
bindPort = 17000
```


# client

docker-compose.yaml

~~~
version: "3"

services:

 frpc:

 container\_name: frpc

 image: snowdreamtech/frpc:0.56.0

 network\_mode: host

 volumes:

- ./frpc.toml:/etc/frp/frpc.toml

 restart: always
~~~

frpc.toml
~~~
[common]
server_addr = ip
server_port = 17000
#tls_enable = true
#kcp_bind_port = 17000
#protocol = kcp
token = 密码


[sshx]
type = tcp
local_ip = 127.0.0.1 
local_port = 22
remote_port = 12222




~~~



