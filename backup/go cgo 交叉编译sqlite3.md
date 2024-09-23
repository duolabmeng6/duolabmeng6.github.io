---
title: "go cgo 交叉编译sqlite3"
date: 2024-09-23T09:00:08
tags: ['golang']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/19"
---


二进制文件是用 'CGO\_ENABLED=0' 编译的，go-sqlite3 需要 cgo 才能工作。

~~~
brew install FiloSottile/musl-cross/musl-cross
~~~

```

env CC=x86_64-linux-musl-gcc CXX=x86_64-linux-musl-g++ GOARCH=amd64 GOOS=linux CGO_ENABLED=1 \
  go build -ldflags "-linkmode external -extldflags -static"

```

各种资料

https://github.com/mattn/go-sqlite3/issues/797

https://titanwolf.org/Network/Articles/Article?AID=70ceaf7f-fda5-46cb-a0cc-0cc347d1156c#gsc.tab=0

https://stackoverflow.com/questions/59698483/how-to-cross-compile-a-go-package-using-github-com-mattn-go-sqlite3-for-a-google

https://blog.qiurank.com/
这个博客将了cgo

xgo教程
https://www.bilibili.com/video/av40133443/





# xgo编译教程
https://blog.csdn.net/weixin_49393427/article/details/114265359

xgo ~/Desktop/goproject/testfq  

# 安装xgo 

这个包支持 mod 

https://github.com/techknowlogick/xgo

```
docker pull techknowlogick/xgo:latest
go get src.techknowlogick.com/xgo
```

此时xgo的可执行文件会默认安装在`~/go/bin/xgo`，可以设置环境变量，这样输入xgo就可以直接执行

# 编译
项目路径在 

/Users/xxxx/Desktop/goproject/testfq

所以改成  ~/Desktop/goproject/testfq

```
xgo ~/Desktop/goproject/testfq —targets=linux/amd64
```
# 参考资料
https://holmesian.org/go-cross-compile-xgo

