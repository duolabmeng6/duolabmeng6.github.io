---
title: "docker实用技巧"
date: 2024-09-23T08:55:26
tags: ['docker']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/12"
---


# 为程序构建启动脚本


## 构建并且运行的脚本

start_t1_ocr.sh
```
docker rm -f testocr
docker build -t testocr:1.0 .
docker run -itd --name testocr -v /root/llq:/app testocr:1.0 /bin/bash -c "cd /app && python t1_imgs_handle.py"

```

## 查看日志的脚本

log_t1_ocr.sh

```
docker logs testocr --tail 10 -f
```


# 自定义构建镜像时


## python运行环境

```
docker run -itd --name pythonrun -p 9005:9000 -v 主机目录:/app python:3.7.10-slim /bin/bash

docker exec -it pythonrun  /bin/bash 
```
### 依赖安装

建议先将包下载回来 然后再进行安装 避免每次都要重新下载速度慢

下载离线安装包
```
pip download -r requirements.txt -d ./pg 
pip download paddlepaddle==2.0.2 -i https://mirror.baidu.com/pypi/simple -d ./pg
pip download paddlehub -d ./pg
```

安装离线安装包
```


pip install -r requirements.txt --find-links ./pg
pip install paddlepaddle --find-links ./pg
pip install paddlehub -U --no-index --find-links ./pg
```
 

## 打包镜像并上传到镜像仓库

调试完成提交到阿里云镜像仓库

```

docker commit pythonrun pythonrun:1.0
docker tag pythonrun:1.0 registry.cn-hongkong.aliyuncs.com/llapi/pythonrun:1.0
docker push registry.cn-hongkong.aliyuncs.com/llapi/pythonrun:1.0

```

## 清理缓存

```
rm -rf /root/.cache/* \
&& rm -rf /var/lib/apt/lists/* \
&& rm -rf /app/test/pg/*
```

# 其他笔记



## 导出容器为镜像
```

docker commit 容器名称 镜像名称:1.3
```


## 导出镜像为文件
```

docker export -o 文件名.tar 容器名称
```


## 查看修改记录
```

docker container diff 容器名称 > 容器修改记录.log
```





## 查看层的大小
```

docker image history 镜像名称
```


## 运行中的容器大小


```

docker container ls -s
```

# 进入容器

```
docker exec -it pythonrun  /bin/bash 
```

# docker-compose


# 启动
```
docker-compose -f docker-compose.yml up -d
```





