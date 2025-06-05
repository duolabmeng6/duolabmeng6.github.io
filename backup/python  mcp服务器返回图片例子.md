---
title: "python  mcp服务器返回图片例子"
date: 2025-06-04T10:45:03
tags: ['人工智能']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/27"
---

```
"""
FastMCP图片工具示例

这个示例演示如何在FastMCP中创建返回图像的工具
"""

from fastmcp import FastMCP, Image
from typing import Optional, List, Dict, Any
from PIL import Image as PILImage
from PIL import ImageDraw, ImageFont
import os
import io
import base64
# 创建FastMCP实例
mcp = FastMCP(name="图片处理服务")

@mcp.tool()
def image_to_base64(image_path: str) -> Image:
    """
    读取指定路径的图片，并返回一个表示该图片的 fastmcp.Image 对象，使用其原始数据和检测到的格式。
    Args:
        image_path: 图片文件的路径。
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"图片文件 '{image_path}' 不存在")

    # Open with PIL to get format, then read raw data
    pil_img = PILImage.open(image_path)
    # Use PIL's detected format, defaulting to PNG if not found (as in resize_image)
    # Format should be lowercase for fastmcp.Image constructor based on generate_image example (format="png")
    img_format = (pil_img.format or "PNG").lower()

    with open(image_path, "rb") as f:
        image_data = f.read()

    # The old mime_type and base64_str logic is no longer needed here for constructor

    # 返回 fastmcp.Image 对象，使用原始图像数据和格式
    return Image(data=image_data, format=img_format)
 

if __name__ == "__main__":
    print("\n启动FastMCP图片处理服务器...")
    mcp.run() 
```