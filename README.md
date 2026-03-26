# 碎言博客

基于 [Ataraxia](https://github.com/inakicalvo/astro-ataraxia-theme) 主题构建的个人博客。

## 关于

碎言，碎碎念之言。记录生活、技术、思考的地方。

## 技术栈

- **框架**：Astro 6
- **主题**：Ataraxia
- **部署**：Vercel
- **字体**：Atkinson Hyperlegible + 中文字体 fallback

## 本地预览

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── src/
│   ├── content/blog/    # 博客文章（Markdown/MDX）
│   ├── components/      # 组件
│   ├── layouts/         # 布局
│   ├── pages/           # 页面
│   └── styles/          # 样式
├── public/              # 静态资源
└── astro.config.mjs     # Astro 配置
```

## 功能

- 📝 Markdown/MDX 写作
- 🏷️ 标签分类
- 🌙 深色模式
- 🔍 站内搜索
- 💬 评论系统（Giscus/Twikoo）
- 📡 RSS 订阅
- 🗺️ Sitemap

## 链接

- **博客地址**：https://www.suiyan.cc/
- **GitHub**：https://github.com/bosichong/suiyanblog

---

## 致谢

本博客使用以下开源项目：

- [Astro](https://astro.build/) - 静态站点生成器
- [Ataraxia](https://github.com/inakicalvo/astro-ataraxia-theme) - 博客主题（MIT License）
- [Bear Blog](https://bearblog.dev/) - 设计灵感

主题原作者：[inakicalvo](https://github.com/inakicalvo)

---

## License

博客内容版权归作者所有。

主题代码遵循 MIT License。