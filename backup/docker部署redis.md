---
title: "docker部署redis"
date: 2024-09-23T08:53:52
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/11"
---

dockerfile

~~~
FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
~~~

```
docker run --name some-redis1 -p 6380:6379  -d redis --requirepass "123456"
```
redis启动的默认端口号是6379，这个时候宿主机使用6380进行映射，并设置授权密码123456，


# 启动redis
~~~
docker run --name redis-rpc -p 6379:6379 -d redis  --requirepass "duolabmeng"
~~~
