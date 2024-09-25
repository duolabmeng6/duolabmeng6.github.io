---
title: "docker-compose常用命令"
date: 2024-09-25T11:37:32
tags: ["技术分享"]
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/23"
---

### 拉取最新镜像重新部署

建立文件 run.sh

```
docker-compose pull
docker-compose down
docker-compose up -d --build
```

### 查看日志

```
docker-compose logs -f --tail 100

```