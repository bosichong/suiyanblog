# 碎言博客

https://www.suiyan.cc

一个基于 Next.js 构建的现代化个人博客系统，专注于深度阅读与技术分享。

## 特性

- 🚀 **高性能**: 基于 Next.js 构建，支持静态站点生成 (SSG) 和服务端渲染 (SSR)
- 📝 **Markdown 支持**: 使用 react-markdown 和 remark-gfm 提供完整的 Markdown 支持
- 🎨 **现代 UI**: 基于 Tailwind CSS 构建的响应式设计，适配各种设备
- 🔍 **搜索功能**: 内置博客文章搜索功能
- 👥 **友链管理**: 完整的友情链接管理系统
- 💬 **评论系统**: 集成 Giscus 基于 GitHub Discussions 的评论系统
- 📱 **RSS 订阅**: 自动生成 RSS feed，方便读者订阅
- 🔧 **SEO 优化**: 自动生成 sitemap，优化搜索引擎收录
- ⚡ **静态导出**: 支持导出为纯静态站点，可部署到任何静态托管服务

## 技术栈

- **框架**: Next.js 16
- **UI 库**: React 18
- **样式**: Tailwind CSS
- **内容管理**: Markdown 文件 + gray-matter
- **评论**: Giscus
- **TypeScript**: 完整的类型支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看博客。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

### 创建新文章

```bash
npm run nb
```

按照提示输入文章标题、分类、标签等信息，脚本会自动在 `md` 目录下创建新的 Markdown 文件。

### 导出静态站点

```bash
npm run build
npm run preview
```

静态文件将生成在 `out` 目录，可以使用任何静态托管服务部署。

## 目录结构

```
suiyanblog/
├── md/                  # Markdown 博客文章
├── public/              # 静态资源文件
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # React 组件
│   ├── lib/            # 工具库
│   ├── pages/          # 自定义页面
│   ├── styles/         # 样式文件
│   ├── utils/          # 工具函数
│   ├── config.ts       # 博客配置
│   └── types.ts        # TypeScript 类型定义
├── createBlog.js       # 博客文章创建脚本
├── generateRSS.js      # RSS 生成脚本
└── generateSitemap.js  # Sitemap 生成脚本
```

## 配置

博客的主要配置项位于 `src/config.ts` 文件中，包括：

- 博客名称和描述
- 作者信息
- 菜单项
- 友链列表
- 社交媒体链接
- SEO 相关配置

## 文章格式

博客文章使用 Markdown 格式，文件名格式为 `YYYYMMDDHHmmss.md` 或数字编号。文章头部需要包含 frontmatter 元数据：

```markdown
---
title: 文章标题
date: 2025-01-01
category: 分类
tags: [标签1, 标签2]
---

文章内容...
```

## 部署

### Vercel

推荐使用 Vercel 部署，提供零配置部署体验：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

项目支持静态导出，可以部署到：
- GitHub Pages
- Netlify
- Cloudflare Pages
- 任何支持静态网站托管的服务

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。