# 碎言博客

基于 Astro 构建的个人博客，使用 Ataraxia 主题，部署于 Vercel。

- **博客地址**：https://www.suiyan.cc/
- **GitHub**：https://github.com/bosichong/suiyanblog

## 技术栈

- Astro 6 + TypeScript
- Ataraxia 主题
- Vercel 部署

## 项目结构

```
├── src/
│   ├── content/blog/    # 博客文章（Markdown）
│   ├── assets/images/   # 图片资源（按年份存放）
│   ├── components/      # 组件
│   ├── layouts/         # 布局
│   └── pages/           # 页面
├── skills/              # 项目技能（见下方说明）
└── astro.config.mjs     # Astro 配置
```

## 常用命令

```bash
npm run dev      # 开发模式
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
```

## 技能目录

本项目包含项目专用技能，位于 `skills/` 目录：

### suiyan-blog

博客文章管理技能，用于创建和发布文章。

**技能文件**：`skills/suiyan-blog/SKILL.md`

**触发词**：
- "创建碎言博客文章"
- "创建博客文章"
- "推送博客"

**功能**：
- 创建新博客文章（Markdown 格式）
- 自动生成文件名（时间戳格式）
- 设置标题、描述、标签、缩图、AI 标识
- 推送到 GitHub

**AI 标识说明**（5 级）：
- 0 = HAND（手写）— 作者亲手敲出
- 1 = VOICE（口述）— 语音转文字，AI 修正
- 2 = POLISH（润色）— 核心由作者完成，AI 辅助
- 3 = DUET（协奏）— 人与 AI 共创
- 4 = AUTO（自动）— AI 主导生成，人类审核

**文章目录**：`src/content/blog/`
**图片目录**：`src/assets/images/年份/`

**文章格式**：

```markdown
---
title: '文章标题'
description: '文章描述'
time: '2026-04-30T08:38:00.000+08:00'
tags: ['technology', '其他标签']
heroImage: '../../assets/images/2026/图片名.jpg'
heroImageAlt: '图片描述'
ai_label: 0
---

文章内容...
```

**使用方式**：加载技能后按流程执行，用户说填什么 ai_label 就填什么，不要自己判断。

test