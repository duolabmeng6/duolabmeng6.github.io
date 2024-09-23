---
title: "go编译"
date: 2024-09-23T08:59:23
tags: ['docker']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/18"
---

Windows 下编译Linux 64位可执行程序

~~~
SET GOOS=linux
SET GOARCH=amd64

go build
~~~

GOOS：目标平台（darwin、freebsd、linux、windows） 

GOARCH：目标平台的体系[架构](http://lib.csdn.net/base/architecture)（386、amd64、arm）

交叉编译不支持 CGO

window 后台方式运行

~~~
go build -ldflags "-H=windowsgui"
~~~

# 编译window运行的程序

```
SET GOOS=windows
SET GOARCH=amd64

go build
```

# 编译linux运行的程序

```
SET GOOS=linux
SET GOARCH=amd64

go build
```