# 1.下载override项目
[linux-do/override: 啥也不是 (github.com)](https://github.com/linux-do/override)

新建这个文件 config.conf 
```
{
  "bind": "0.0.0.0:8181",
  "proxy_url": "",
  "timeout": 600,
  "codex_api_base": "https://api.deepseek.com/beta/v1",
  "codex_api_key": "sk-",
  "codex_api_organization": "",
  "codex_api_project": "",
  "codex_max_tokens": 500,
  "code_instruct_model": "deepseek-coder",
  "chat_api_base": "https://api.deepseek.com/v1",
  "chat_api_key": "sk-",
  "chat_api_organization": "",
  "chat_api_project": "",
  "chat_max_tokens": 4096,
  "chat_model_default": "deepseek-chat",
  "chat_model_map": {
  },
  "chat_locale": "zh_CN",
  "auth_token": ""
}
```
运行 `docker-compose up -d`
访问 `http://127.0.0.1:8181` 这个服务就部署成功了

# 2.安装 VSCode Copilot
Copilot 1.219.0
Copilotchat 0.17.1
按 ctrl+shift+p 输入 settings 打开首选项 加入这些配置

```
  "github.copilot.advanced": {
    "debug.overrideCAPIUrl": "http://127.0.0.1:8181/v1",
    "debug.overrideProxyUrl": "http://127.0.0.1:8181",
    "debug.chatOverrideProxyUrl": "http://127.0.0.1:8181/v1/chat/completions",
    "authProvider": "github-enterprise"
  },
  "github-enterprise.uri": "https://cocopilot.org"
```

保存后重启VSCode

# 3.登录Copilot插件齐活能用了

# 关闭vscode补全的提示声音

如果你觉得声音不烦 这里不用处理了

vscode按 ctrl+shift+p 输入 settings 打开首选项 加入这些配置

```
    "accessibility.signals.chatRequestSent": {
        "sound": "off",
        "announcement": "off"
    },
    "accessibility.signals.chatResponseReceived": {
        "sound": "off"
    },
    "accessibility.signals.diffLineDeleted": {
        "sound": "off"
    },
    "accessibility.signals.clear": {
        "sound": "off",
        "announcement": "off"
    },
    "accessibility.signals.diffLineInserted": {
        "sound": "off"
    },
```

# JetBrains IDE的配置方法

## 1.下载插件的版本插件版本  1.5.8.5775 [GitHub Copilot Plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot/versions/stable)

## 2.加入这个配置 cocopilot.org
![image](https://github.com/user-attachments/assets/daa5ff89-9b0b-4fe8-bd61-0fee3935a114)
Settings -> Languages & Frameworks -> GitHub Copilot -> Authentication Provider: cocopilot.org

## 3.下载这个两个插件 


[ja-netfilter](https://gitee.com/ja-netfilter/ja-netfilter)
[plugin-env: ](https://gitee.com/ja-netfilter/plugin-env/releases)
![image](https://github.com/user-attachments/assets/ed8117c5-3ef1-4312-9e0c-6abcbe428f47)

`goland.vmoptions`  这里默认你们会了
```
-javaagent:/Users/ll/ja-netfilter/ja-netfilter.jar
```


env.conf 
```
[ENV]
PREFIX,AGENT_DEBUG_OVERRIDE_CAPI_URL=http://127.0.0.1:8181/v1
PREFIX,AGENT_DEBUG_OVERRIDE_PROXY_URL=http://127.0.0.1:8181
PREFIX,GITHUB_COPILOT_OVERRIDE_CAPI_URL=http://127.0.0.1:8181/v1
PREFIX,GITHUB_COPILOT_OVERRIDE_PROXY_URL=http://127.0.0.1:8181
```
## 4. 登录Copilot插件齐活能用了

