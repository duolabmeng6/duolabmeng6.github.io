---
title: "API 开发规范"
date: 2025-07-21T23:21:49
tags: ["技术分享"]
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/31"
---

# API 开发规范

## 基本原则
- RESTful 设计，无状态
- 统一使用 JSON 格式
- 路由前缀：`/api/v1`
- 认证方式：`Authorization: Bearer <token>`

## 路由规范
- 资源名使用复数：`/users`、`/user_profiles`
- HTTP 方法对应操作：
  - `GET` - 查询
  - `POST` - 创建
  - `PUT/PATCH` - 更新
  - `DELETE` - 删除

## 统一响应格式
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "meta": {},     // 分页时使用
  "errors": {}    // 验证失败时使用
}
```

## 状态码
| 业务码  | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求错误 |
| 401 | 验证失败 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 未找到 |
| 429 | 请求过频 |
| 500 | 服务器错误 |

## 响应示例

**成功响应**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}
```

**验证失败**
```json
{
  "code": 401,
  "message": "验证失败",
  "errors": {
    "name": ["用户名不能为空"],
    "password": ["密码至少8位"]
  }
}
```

**分页响应**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [...],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50
  }
}
```