# Suiyan.cc UI 视觉升级验收报告

验收日期：2026-11-13

验收分支：`dev`

结论：**通过**

## 交付范围

本次升级只调整视觉表现，保留现有页面布局、模块顺序、组件职责、导航、路由、文章数据、SEO 与 Astro 架构。

- 未新增页面或页面模块。
- 未删除现有功能。
- 未引入 UI 框架或新依赖。
- 未改变 720px 内容栏和 760px 页面外框。
- 未修改 Markdown 文章内容与 URL。

## 视觉结果

### 设计方向

最终视觉语言为“卷帙 · Editorial Folio”：

- 暖纸背景、纸白内容面、墨色文字。
- 低饱和蓝灰承担链接、hover 和交互反馈。
- 标题使用中文宋体/思源宋体回退，正文继续使用 Atkinson Hyperlegible Next。
- 列表采用“标题 — 细线 — 等宽日期”的编辑排版。
- 结构型表面使用直角，标签和圆形控件使用 pill。
- 普通卡片和图片取消默认阴影，减少上移动效。

### 主要修正

- 首页、归档和标签列表在 320px–1440px 下均可完整显示标题。
- Header 图标触控区域由 34×34px 提升到 44×44px。
- 正文强调不再全部使用波浪下划线。
- 移动端正文取消两端对齐，改为更稳定的左对齐阅读。
- 搜索框、标签、AI 标识、按钮和卡片统一到同一套 token。
- About 页面从重复卡片改为连续章节与细线分隔。
- 赞助记录表在窄屏使用容器内横向滚动。
- Loader 从高对比彩色终端收敛为暖纸色、墨色和蓝灰的紧凑排版样张。
- 页面绘制动效保留，但颜色收敛为墨色、蓝灰和暖灰。

## 构建结果

命令：

```bash
npm run build
```

结果：通过，退出码 0。

- 搜索索引生成：493 篇文章。
- Astro 静态页面：760 页。
- 字体资源：3 个本地字体文件。
- 图片优化：49 个响应式产物。

构建中存在一个非阻断警告：

```text
[astro-icon] Failed to load icons from "src/icons": ENOENT
```

该警告与本次视觉改动无关，构建和图标使用均成功完成。首次在沙箱内执行时，Astro 字体插件因禁止本地监听返回 `EPERM`；在沙箱外重跑后完整通过。

## 响应式验收

检查视口：320、375、768、1024、1440px。

检查路由：首页、文章详情、Blog、归档、Projects、Links、赞助、搜索、标签、About、404。

| 检查项 | 结果 |
| --- | --- |
| 整页横向滚动 | 11 个路由 × 5 个视口均未出现 |
| 首页标题截断 | 20/20 标题完整显示 |
| 归档标题截断 | 494/494 标题完整显示 |
| 标签详情标题截断 | 132/132 标题完整显示 |
| Header 最小触控区域 | 44×44px |
| 赞助表格 | 320px 下容器内滚动，页面本身不横向溢出 |
| 文章正文 | 移动端左对齐，桌面端保留编辑式段落缩进 |

## 交互验收

使用 Playwright 对本地预览构建进行检查：

- 主导航跳转正常，当前页 active 状态正常。
- 标签总览可进入具体标签详情。
- 归档月份可展开，使用 `details[name="archive"]` 的互斥展开行为正常。
- 搜索输入 `AI` 后返回 192 条结果。
- 文章评论懒加载成功，Twikoo 显示 7 条评论和评论表单。
- 点赞按钮成功响应，测试文章点赞数由 0 变为 1。

注意：点赞测试写入的是现有外部点赞服务，无法在页面上直接撤销。该文章当前点赞计数为 1。

## 控制台

- 有效页面：0 个应用错误。
- 持续出现的 1 条警告来自 GoatCounter：localhost 环境不记录访问统计。
- `/404` 路由返回 404 属于预期行为。
- 构建预览页面的 Twikoo、搜索索引和全局脚本均无应用错误。

## 截图

### 改前

- `output/playwright/baseline/home-320-live.png`
- `output/playwright/baseline/home-375-live.png`
- `output/playwright/baseline/home-768-live.png`
- `output/playwright/baseline/home-1024-live.png`
- `output/playwright/baseline/home-1440-live.png`
- `output/playwright/baseline/article-320-live.png`
- `output/playwright/baseline/article-375-live.png`
- `output/playwright/baseline/article-768-live.png`
- `output/playwright/baseline/article-1024-live.png`
- `output/playwright/baseline/article-1440-live.png`

### 改后

- `output/playwright/after/home-320.png`
- `output/playwright/after/home-375.png`
- `output/playwright/after/home-768.png`
- `output/playwright/after/home-1024.png`
- `output/playwright/after/home-1440.png`
- `output/playwright/after/article-320.png`
- `output/playwright/after/article-375.png`
- `output/playwright/after/article-768.png`
- `output/playwright/after/article-1024.png`
- `output/playwright/after/article-1440.png`

补充页面截图：

- `output/playwright/after/blog-1440.png`
- `output/playwright/after/projects-1440.png`
- `output/playwright/after/links-1440.png`
- `output/playwright/after/about-1440.png`

改前截图使用当前线上站生成，改后截图使用本地源码和 Playwright 生成。改后截图右下角可能包含 Astro 开发工具栏，它不属于网站 UI。

## 修改文件清单

设计文档：

- `UI_AUDIT.md`
- `DESIGN_SYSTEM.md`
- `VISUAL_QA.md`

全局与布局：

- `src/styles/global.css`
- `src/layouts/BlogPost.astro`

组件：

- `src/components/AILabelBadge.astro`
- `src/components/BackToTop.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/PageLoader.astro`
- `src/components/TagList.astro`

页面：

- `src/pages/404.astro`
- `src/pages/about.astro`
- `src/pages/archive.astro`
- `src/pages/blog/index.astro`
- `src/pages/index.astro`
- `src/pages/links.astro`
- `src/pages/projects.astro`
- `src/pages/search.astro`
- `src/pages/sponsors.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/tags/index.astro`

动效配色：

- `src/scripts/page-motion.ts`

## 最终结论

视觉升级达到高级编辑排版、长期阅读和高一致性的目标，同时保持了原始页面结构。当前不存在阻塞交付的 UI、响应式、交互或构建问题。
