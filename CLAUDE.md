# 碎言博客

基于 Astro 构建的个人博客，部署于 Vercel。

- **博客地址**：https://www.suiyan.cc/
- **GitHub**：https://github.com/bosichong/suiyanblog

## 技术栈

- Astro 6 + TypeScript（Node ≥ 22，见 `.nvmrc`）
- MDX（`@astrojs/mdx`）— 文章支持 `.md` 与 `.mdx`
- 集成：Sitemap、RSS、Iconify 图标、FlexSearch 站内搜索
- 字体：本地 Atkinson Hyperlegible Next / Mono
- 评论：Giscus（GitHub Discussions）+ Twikoo（Netlify Functions）
- 部署：Vercel（`vercel.json`）

## 项目结构

```
├── src/
│   ├── content/blog/         # 博客文章（Markdown / MDX）
│   ├── content.config.ts     # 内容集合 schema（zod 校验 frontmatter）
│   ├── assets/
│   │   ├── images/年份/      # 文章配图
│   │   └── fonts/            # 本地字体
│   ├── components/           # Astro 组件
│   ├── layouts/              # 页面布局
│   ├── pages/                # 路由页面
│   ├── styles/               # 全局样式
│   ├── utils/                # 工具函数（date / readingTime / slugify）
│   └── consts.ts             # 站点全局常量（菜单、友链、AI 标识、评论配置等）
├── scripts/                  # Node 脚本（搜索索引、新建文章等）
├── public/                   # 静态资源
└── astro.config.mjs          # Astro 配置
```

## 常用命令

```bash
npm run dev            # 开发模式
npm run build          # 生产构建（先跑搜索索引脚本，再 astro build）
npm run preview        # 预览构建结果
npm run build:search   # 仅构建 FlexSearch 索引
npm run nb             # 新建博客文章（交互式脚手架）
```

## 构建流程

`npm run build` 实际执行两步：
1. `node scripts/build-search-index.mjs` — 扫描 `src/content/blog/` 生成客户端搜索索引
2. `npx astro build` — 输出到 `dist/`，由 Vercel 接管

## 文章 frontmatter

内容集合 schema 定义于 `src/content.config.ts`：

```markdown
---
title: '文章标题'
description: '文章描述'
time: '2026-04-30T08:38:00.000+08:00'   # ISO 字符串，发布/排序时间
updatedDate: '2026-05-01T10:00:00Z'      # 可选，最后更新
tags: ['technology', '其他标签']          # 至少 1 个
heroImage: '../../assets/images/2026/xxx.jpg'   # 可选
heroImageAlt: '图片描述'                  # 可选
ai_label: 0                              # 0-4，见下表
---
```

**AI 标识（ai_label，5 级）**：
- 0 = HAND（手写）— 作者亲手敲出
- 1 = VOICE（口述）— 语音转文字，AI 修正
- 2 = POLISH（润色）— 核心由作者完成，AI 辅助
- 3 = DUET（协奏）— 人与 AI 共创
- 4 = AUTO（自动）— AI 主导生成，人类审核

> 用户在创作流程中明确告知 `ai_label` 取值时按用户填写，不要自己判断。
