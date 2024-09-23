---
title: "记一次误删mysql全部数据恢复的过程"
date: 2024-09-23T08:49:42
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/10"
---

# 记一次误删mysql全部数据恢复的过程

# 原因
laravel 运行了一下
`php artisan test`

```
class ApiTokenPermissionsTest extends TestCase
{
    use RefreshDatabase;

```
他自带的测试文件中，有重置数据库的功能。
所以整个数据库都被删除了
原地爆炸啊。线上的数据库。

# 服务器上寻找binlog文件
在这里找到所有binlog文件然后下载到自己电脑上
`/var/lib/mysql/`这个目录下找到了5个binlog文件

`/var/lib/mysql/binlog.000012`

![](images/screenshot_1616932925864.png)

# binlog压缩后下载到自己电脑

```
gzip  binlog.000012
```
# 在电脑中安装mysql

```
brew install mysql
```

配置一下 建立好要恢复的数据库和表和用户账号


# 导出为sql语句查看
···
mysqlbinlog -v --base64-output=decode-rows /Users/ll/fsdownload/binlog.000010 --stop-datetime="2021-03-27 00:00:00" > 000010.sql
mysqlbinlog -v --base64-output=decode-rows /Users/ll/fsdownload/binlog.000011 --stop-datetime="2021-03-27 00:00:00" > 000011.sql
mysqlbinlog -v --base64-output=decode-rows /Users/ll/fsdownload/binlog.000012 --stop-datetime="2021-03-27 00:00:00" > 000012.sql
mysqlbinlog -v --base64-output=decode-rows /Users/ll/fsdownload/binlog.000013 --stop-datetime="2021-03-27 00:00:00" > 000013.sql
···

# 恢复数据

这是在自己电脑上运行，已经配置好了mysql，运行完他就把历史执行的sql语句执行了

需要注意的点，
` --stop-datetime='2021-03-26 22:00:00'`
这里的时间是删库操作之前，否则把删库的命令也执行了的话就需要重新来一次了。


```
mysqlbinlog -d yjd /Users/ll/fsdownload/binlog.000010|mysql -u yjd -p
mysqlbinlog -d yjd /Users/ll/fsdownload/binlog.000011|mysql -u yjd -p
mysqlbinlog -d yjd /Users/ll/fsdownload/binlog.000012|mysql -u yjd -p
mysqlbinlog -d yjd /Users/ll/fsdownload/binlog.000013|mysql -u yjd -p
mysqlbinlog -d yjd /Users/ll/fsdownload/binlog.000013 --start-datetime='2019-3-27 12:04:08' --stop-datetime='2021-03-26 22:00:00'|mysql -u yjd -p
```
# 恢复时遇到错误的话
执行看错误的位置 跳过地方
```
--start-position=780 起始pos点
--stop-position=904 结束pos点
--start-datetime='2019-3-27 12:04:08' 起始时间点
--stop-datetime="2019-3-27 12:49:46" 结束时间点
--database=my_test 指定只恢复my_test数据库(一台主机上往往有多个数据库，只限本地log日志)
```


# 恢复
把电脑上的数据库导出为sql语句

随后导入线上的数据库

完成数据恢复
