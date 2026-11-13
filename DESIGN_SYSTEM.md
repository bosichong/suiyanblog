# Suiyan.cc Design System

## 设计方向

### 核心概念

**卷帙 · Editorial Folio**

页面是一册安静的个人刊物：暖纸色承载内容，墨色建立阅读秩序，低饱和蓝灰只用于需要识别的交互。视觉重点来自标题、正文、细线和字号关系，而不是卡片、阴影或装饰动效。

### 设计原则

1. 阅读优先：正文始终是页面上最稳定、最清晰的区域。
2. 平面优先：结构表面以边框和留白区分，不用浮起卡片模拟层级。
3. 编辑优先：标题、元信息、日期和分隔线形成可重复的版面语法。
4. 克制优先：同一页面只保留一种强调色和少量状态变化。
5. 一致优先：页面、文章、归档和辅助页面共用同一套 token。

### 记忆点

现有文章列表的“标题 — 细线 — 日期”将成为全站编辑语言的基准。日期使用等宽数字与轻微字距，细线作为版面标尺，不使用装饰性编号或额外内容。

## Color

| Token | 值 | 用途 |
| --- | --- | --- |
| `--color-canvas` | `#f3f1eb` | 网站暖纸背景 |
| `--color-paper` | `#fffdf8` | 主内容纸面 |
| `--color-paper-muted` | `#f7f4ed` | 次级表面、输入框和代码背景 |
| `--color-ink` | `#1f1e1a` | 主文字 |
| `--color-ink-soft` | `#4d4a43` | 次级文字 |
| `--color-ink-muted` | `#6b675e` | 元信息与辅助文字 |
| `--color-rule` | `#d8d2c6` | 主边框和分隔线 |
| `--color-rule-soft` | `#e7e2d8` | 次级边框 |
| `--color-accent` | `#4e6673` | 链接、图标和主操作 |
| `--color-accent-strong` | `#344b57` | hover、active 和高对比强调 |
| `--color-accent-soft` | `#e9eef0` | 低强度强调背景 |
| `--color-on-accent` | `#fffdf8` | 深色强调背景上的文字 |
| `--color-female` | `#a33b64` | 友链女性博主标识 |

关键对比度：

- 主文字 / 纸面：16.41:1
- 次级文字 / 纸面：8.69:1
- 辅助文字 / 纸面：5.54:1
- 强调色 / 纸面：5.95:1
- 深强调色 / 纸面：9.02:1
- 深强调色 / 浅强调背景：7.84:1

## Typography

### Font Family

- Display：`Noto Serif SC`, `Source Han Serif SC`, `Songti SC`, `STSong`, `LXGW WenKai`, `SimSun`, serif
- Body：Atkinson Hyperlegible Next + 中文衬线回退
- Mono：Atkinson Hyperlegible Mono + 中文等宽/Consolas 回退

字体资源仍使用项目已有本地文件，不引入外部字体依赖。中文标题优先使用系统可用的宋体/思源宋体，避免把未打包的楷体作为首要字体。

### Type Scale

| Token | 值 | 用途 |
| --- | --- | --- |
| `--text-caption` | `0.8125rem` | 辅助标记 |
| `--text-small` | `0.875rem` | 元信息、标签 |
| `--text-base` | `1rem` | 控件与次级说明 |
| `--text-body` | `1.125rem` | 正文 |
| `--text-lead` | `1.25rem` | 摘要与导语 |
| `--text-h3` | `1.5rem` | 三级标题 |
| `--text-h2` | `clamp(1.75rem, 2.8vw, 2.25rem)` | 二级标题 |
| `--text-h1` | `clamp(2.25rem, 4.3vw, 3rem)` | 页面标题 |
| `--text-display` | `clamp(2.5rem, 5vw, 3.5rem)` | 极少数首页/品牌标题 |

### Line Height and Tracking

| Token | 值 | 用途 |
| --- | --- | --- |
| `--leading-tight` | `1.18` | 大标题 |
| `--leading-heading` | `1.3` | 常规标题 |
| `--leading-ui` | `1.45` | 标签、元信息 |
| `--leading-body` | `1.85` | 中文正文 |
| `--tracking-heading` | `-0.01em` | 标题收紧 |
| `--tracking-body` | `0.012em` | 正文轻微字距 |
| `--tracking-label` | `0.06em` | 日期与辅助标签 |

## Spacing

采用 4px 基准：

| Token | 值 |
| --- | --- |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `2.5rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |
| `--space-20` | `5rem` |

组件内部优先使用 `space-3/4/5/6`，区块之间使用 `space-8/10/12`，不引入新的随机间距。

## Border, Radius and Shadow

### Radius

| Token | 值 | 语义 |
| --- | --- | --- |
| `--radius-square` | `0` | 纸面、图片、列表表面 |
| `--radius-control` | `4px` | 输入框、小型按钮 |
| `--radius-pill` | `999px` | 标签、状态标识、圆形控件 |

结构型表面不使用 8px 或 12px 圆角。只有明确的胶囊语义使用 pill。

### Border

- 主边框：`1px solid var(--color-rule)`
- 次级边框：`1px solid var(--color-rule-soft)`
- focus：`2px solid var(--color-accent)`

### Shadow

| Token | 值 | 用途 |
| --- | --- | --- |
| `--shadow-paper` | `0 18px 50px rgba(31, 30, 26, 0.05)` | 网站纸面外框 |
| `--shadow-control` | `0 3px 12px rgba(31, 30, 26, 0.12)` | 浮动控件 |
| `--shadow-overlay` | `0 20px 64px rgba(31, 30, 26, 0.16)` | Loader/浮层 |

普通卡片、图片、标签和按钮不使用默认阴影。

## Motion

| Token | 值 | 用途 |
| --- | --- | --- |
| `--duration-fast` | `140ms` | hover、focus、按压 |
| `--duration-base` | `220ms` | 状态变化 |
| `--duration-slow` | `320ms` | 浮层进入/退出 |
| `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | 进入与展开 |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | 退出 |

Hover 优先改变颜色、边框和下划线，不再默认上移卡片。打字机与页面绘制保留现有交互能力，但颜色收敛到墨色和蓝灰，减少彩色粒子与高对比装饰。

## Layout

| Token | 值 | 约束 |
| --- | --- | --- |
| `--content-width` | `720px` | 内容阅读栏 |
| `--shell-width` | `760px` | 页面纸面外框 |
| `--page-gutter` | `1rem` | 窄屏侧边距 |
| `--touch-target` | `44px` | 可点击控件最小尺寸 |

本次升级不改变现有 720px/760px 容器宽度，也不改变任何页面模块顺序。

## Component Rules

### Header

- 保持当前图标与位置。
- 每个图标链接至少 44×44px。
- 当前页使用底部细线和墨色，不使用大色块。

### Editorial Lists

- 标题与日期保持同一行结构。
- 日期使用 tabular numerals 与轻微字距。
- 移动端标题允许换行，不使用单行省略隐藏内容。
- hover 改为墨色/蓝灰与细线增强，不使用卡片上浮。

### Article

- 标题使用 h1 token，元信息使用 small token。
- 正文保持 18px 左右与 1.85 行高；窄屏取消两端对齐，保留可控首行缩进。
- 强调使用颜色、字重和克制下划线，不再对所有 strong 默认使用波浪线。
- 引用、代码、表格、图片共享相同的垂直节奏和细线语言。

### Tags and Controls

- 标签保留 pill 语义，但降低边框和背景对比。
- 普通按钮使用 control radius，不使用多重阴影。
- AI 标识与普通标签共享尺寸、边框和状态规则。

### Footer

- 保持现有结构和内容。
- 降低视觉权重，使用 small token 与纸面次级色。

## Responsive Rules

- 320px：取消正文两端对齐；标题允许换行；表格保持可横向滚动。
- 375px：保持与 320px 相同的阅读规则。
- 768px：内容进入桌面阅读栏，桌面排版规则生效。
- 1024px：保持 720px 内容栏，不随视口继续拉宽。
- 1440px：增加外部纸面留白，不使用多栏或布局重构。

## Acceptance

- 页面模块、顺序、路由、内容、SEO 和交互保持不变。
- 320/375/768/1024/1440 无整页横向滚动。
- 首页与归档标题在窄屏完整显示。
- 可点击导航目标不小于 44×44px。
- 普通文字、链接和 hover 状态达到 WCAG AA。
- 减少装饰性阴影、随机圆角和 `transition: all`。
- 桌面与移动端保持同一编辑排版语言。
