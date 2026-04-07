#!/usr/bin/env python3
"""
碎言博客 - 新建文章脚本

用法：
    python new_post.py --title "标题" --content "内容" [--desc "描述"] [--tags "daily,python"] [--ai-label 0]
"""

import argparse
import os
from datetime import datetime
from pathlib import Path

# 博客文章目录
BLOG_DIR = Path("/home/bosi/code/suiyanblog/src/content/blog")


def create_post(title: str, content: str, desc: str = None, tags: list = None, ai_label: int = 0) -> str:
    """
    创建新博客文章
    
    Args:
        title: 文章标题
        content: 文章内容（Markdown）
        desc: 文章描述，不填则自动截取
        tags: 标签列表，默认 ['daily']
        ai_label: AI标识，0=人工，1=AI生成
    
    Returns:
        创建的文件路径
    """
    # 生成时间戳文件名
    now = datetime.now()
    filename = now.strftime("%Y%m%d%H%M%S") + ".md"
    filepath = BLOG_DIR / filename
    
    # 处理描述
    if not desc:
        # 从内容截取前100字作为描述
        plain_text = content.replace('#', '').replace('*', '').replace('\n', ' ').strip()
        desc = plain_text[:100] + ('...' if len(plain_text) > 100 else '')
    
    # 处理标签
    if not tags:
        tags = ['daily']
    
    # 确保有必填标签
    required_tags = ['daily', 'technology', 'journal']
    has_required = any(t in tags for t in required_tags)
    if not has_required:
        tags.insert(0, 'daily')
    
    # 生成 frontmatter
    tags_str = ', '.join(f"'{t}'" for t in tags)
    time_str = now.strftime("%Y-%m-%dT%H:%M:%S.000+08:00")
    
    frontmatter = f"""---
title: '{title}'
description: '{desc}'
time: '{time_str}'
tags: [{tags_str}]
ai_label: {ai_label}
---

"""
    
    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter + content)
    
    return str(filepath)


def main():
    parser = argparse.ArgumentParser(description='创建碎言博客新文章')
    parser.add_argument('--title', required=True, help='文章标题')
    parser.add_argument('--content', required=True, help='文章内容')
    parser.add_argument('--desc', help='文章描述')
    parser.add_argument('--tags', default='daily', help='标签，逗号分隔')
    parser.add_argument('--ai-label', type=int, default=0, help='AI标识，0或1')
    
    args = parser.parse_args()
    
    # 解析标签
    tags = [t.strip() for t in args.tags.split(',')]
    
    # 创建文章
    filepath = create_post(
        title=args.title,
        content=args.content,
        desc=args.desc,
        tags=tags,
        ai_label=args.ai_label
    )
    
    print(f"✓ 文章已创建: {filepath}")


if __name__ == '__main__':
    main()