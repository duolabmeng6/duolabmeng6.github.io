---
title: "openai的工具函数调用例子"
date: 2024-09-23T08:44:22
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/8"
---

```
import json

import httpx
from openai import OpenAI

api_key = 'sk-'
base_url = 'https://api.deepseek.com/v1'
model = "deepseek-coder"
client = OpenAI(
    api_key=api_key,   # API密钥
    base_url=base_url, # 基础URL
    http_client=httpx.Client(
        proxies="http://127.0.0.1:8888",
        transport=httpx.HTTPTransport(local_address="0.0.0.0"),
        verify=False
    )
)


# Define the search functions (mock implementations for Baidu, Google, and Bing)
def search_baidu(keyword):
    """Search for the keyword on Baidu"""
    return f"{keyword}是一个技术博主"


def search_google(keyword):
    """Search for the keyword on Google"""
    return f"{keyword}是一个后端工程师"


def search_bing(keyword):
    """Search for the keyword on Bing"""
    return f"{keyword}是一个Python爱好者"


# Define the tools in JSON format for OpenAI function calling
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_baidu",
            "description": "从百度搜索引擎中搜索关键词",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "description": "搜索关键词"
                    }
                },
                "required": ["keyword"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_google",
            "description": "从Google搜索引擎中搜索关键词",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "description": "搜索关键词"
                    }
                },
                "required": ["keyword"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_bing",
            "description": "从Bing搜索引擎中搜索关键词",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "description": "搜索关键词"
                    }
                },
                "required": ["keyword"]
            }
        }
    }
]

# Mapping functions to their names
available_functions = {
    "search_baidu": search_baidu,
    "search_google": search_google,
    "search_bing": search_bing
}


def search(keyword):
    messages = [{"role": "user", "content": f"汇总百度、谷歌、必应三个搜索引擎关于'{keyword}'的结果"}]
    
    print(f"初始消息: {messages}")  # 调试信息

    # 第一次请求：决定使用哪些工具
    response = client.chat.completions.create(model=model, messages=messages, tools=tools, tool_choice="auto")
    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    print(f"AI决定使用的工具: {[call.function.name for call in tool_calls]}")  # 调试信息

    if tool_calls:
        messages.append(response_message)
        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)
            function_response = available_functions[function_name](**function_args)
            
            print(f"调用函数 {function_name} 的结果: {function_response}")  # 调试信息
            
            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": function_name,
                "content": function_response
            })

        # 第二次请求：汇总结果
        second_response = client.chat.completions.create(model=model, messages=messages)
        return second_response.choices[0].message.content

    return "未能获取搜索结果"

# 示例使用
result = search("duolabmeng6")
print(f"最终结果: {result}")

```