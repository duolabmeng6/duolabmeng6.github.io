---
title: "FastGPT 与 Ollama 的安装与配置指南"
date: 2024-09-23T09:23:39
tags: ['人工智能']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/20"
---

[toc]

# FastGPT 与 Ollama 的安装与配置指南

## 相关知识

- **FastGPT:** [开发与部署指南 | FastGPT](https://doc.fastgpt.in/docs/development/)
- **Ollama:** [Ollama](https://ollama.com/)
- **M3E:** [uniem/mteb-zh at main · wangyuxinwhy/uniem (github.com)](https://github.com/wangyuxinwhy/uniem/tree/main/mteb-zh)
- **Qwen:** [Qwen模型介绍 qwen2 (ollama.com)](https://ollama.com/library/qwen2)



## FastGPT

### 安装指南

#### 步骤一：安装

你可以使用 Docker Compose 快速部署 FastGPT。

参考文档：[Docker Compose 快速部署 | FastGPT (fastai.site)](https://doc.fastai.site/docs/development/docker/)

参考源码：[FastGPT/files/docker at main · labring/FastGPT (github.com)](https://github.com/labring/FastGPT/tree/main/files/docker)

#### 步骤二：创建文件夹并下载文件

1. 创建一个文件夹，用于存放下载的文件。
2. 下载以下两个文件并放入创建的文件夹中：

   - [docker-compose-pgvector.yml](https://github.com/labring/FastGPT/blob/main/files/docker/docker-compose-pgvector.yml "docker-compose-pgvector.yml")
   - [config.json](https://github.com/labring/FastGPT/blob/main/projects/app/data/config.json)

#### 步骤三：启动服务

在文件夹中运行以下命令启动服务：

```sh
docker-compose up
```

## Ollama

### 安装指南

#### 步骤一：下载

在 Windows 系统上下载并安装 Ollama：[Download Ollama on Windows](https://ollama.com/download)

#### 步骤二：安装模型

运行以下命令来安装和配置模型：

```sh
ollama run qwen2:7b
ollama cp qwen2:7b gpt-3.5-turbo
ollama pull milkey/m3e
ollama cp milkey/m3e m3e
```

#### 步骤三：启动服务

运行以下命令启动服务：

```sh
ollama serve
```

服务启动后，接口地址为：

```
http://127.0.0.1:11434
```

## FastGPT 配置

### 配置 M3E 模型

在配置文件中添加以下内容来配置 M3E 模型：

```json
"vectorModels": [
  {
    "model": "m3e",
    "name": "M3E",
    "inputPrice": 0,
    "outputPrice": 0,
    "defaultToken": 700,
    "maxToken": 1800,
    "weight": 100
  }
]
```

### 配置 LLM 模型

在配置文件中添加以下内容来配置 LLM 模型：

```json
"llmModels": [
  {
    "model": "qwen2:7b",
    "name": "qwen2:7b",
    "maxContext": 16000,
    "avatar": "/imgs/model/openai.svg",
    "maxResponse": 4000,
    "quoteMaxToken": 13000,
    "maxTemperature": 1.2,
    "charsPointsPrice": 0,
    "censor": false,
    "vision": false,
    "datasetProcess": true,
    "usedInClassify": true,
    "usedInExtractFields": true,
    "usedInToolCall": true,
    "usedInQueryExtension": true,
    "toolChoice": true,
    "functionCall": true,
    "customCQPrompt": "",
    "customExtractPrompt": "",
    "defaultSystemChatPrompt": "",
    "defaultConfig": {}
  }
]
```

### One API 配置

访问 [One API](http://127.0.0.1:3001/)

账户密码为：`root` `123456`

配置好 FastGPT 后，就能使用了。


### FastGPT 使用

访问 [FastGPT](http://127.0.0.1:3000)

账户密码为：`root` `1234`

## 扩展知识

- [Ollama 下载模型](https://ollama.com/library)
- [FastGPT 配置文件介绍 | FastGPT (fastai.site)](https://doc.fastai.site/docs/development/configuration/#468-%e7%89%88%e6%9c%ac%e6%96%b0%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6)
