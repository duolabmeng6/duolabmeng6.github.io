---
title: "Whisper 语音识别 - 生成 ASS 字幕文件"
date: 2026-02-24T18:26:37
tags: ['技术分享']
commentNum: 0
issueLink: "https://github.com/duolabmeng6/duolabmeng6.github.io/issues/32"
---

```python
#!/usr/bin/env python
"""
Whisper 语音识别 - 生成 ASS 字幕文件
"""

from faster_whisper import WhisperModel

def format_ass_time(seconds):
    """转换为 ASS 时间格式：H:MM:SS.CC"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    centisecs = int((seconds % 1) * 100)
    return f"{hours}:{minutes:02d}:{secs:02d}.{centisecs:02d}"

def transcribe(audio_file, output_file=None):
    """转录音频并生成 ASS 字幕"""
    model = WhisperModel("tiny", device="cpu", compute_type="int8")

    segments, info = model.transcribe(
        audio_file,
        language="zh",
        word_timestamps=True
    )

    # ASS 文件头
    ass_header = """[Script Info]
Title: Whisper Subtitle
ScriptType: v4.00+
WrapStyle: 0
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,48,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,20,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

    # 生成字幕事件
    events = []
    for segment in segments:
        start = format_ass_time(segment.start)
        end = format_ass_time(segment.end)
        text = segment.text.strip().replace("\n", "\\N")

        events.append(f"Dialogue: 0,{start},{end},Default,,0,0,0,,{text}")

    result = ass_header + "\n".join(events)

    # 保存到文件
    if output_file:
        with open(output_file, "w", encoding="utf-8-sig") as f:  # utf-8-sig for ASS
            f.write(result)
        print(f"✅ 字幕已保存: {output_file}")

    return result

# 使用示例
if __name__ == "__main__":
    audio_file = "audio/test_zh.wav"
    output_file = "audio/test_zh.ass"

    print(transcribe(audio_file, output_file))
```