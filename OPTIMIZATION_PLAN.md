# 碎言博客 - Next.js 静态化优化方案

## 📋 优化目标
将博客从 SSG（静态站点生成）完全转换为纯静态导出，达到接近 Astro 的性能和部署成本。

## 🎯 核心策略
- **强制静态导出**：`output: 'export'` + `unoptimized: true`
- **禁用 ISR**：所有页面设置 `revalidate: false`
- **优化构建产物**：减小包体积，加快首屏加载
- **渐进式改进**：分阶段实施，降低风险

---

## 🚀 优化步骤

### 第一阶段：静态导出配置（核心）
**目标**：将项目从 SSG 转换为纯静态导出

#### 1.1 修改 next.config.mjs
```javascript
// next.config.mjs
const nextConfig = {
  // ... 保留现有配置

  // 🔥 新增：启用静态导出
  output: 'export',

  // 🔥 修改：静态导出必须禁用图片优化
  images: {
    unoptimized: true, // 禁用 Next.js 图片优化
    // 保留 remotePatterns 和其他配置
  },

  // 🔥 新增：禁用服务端功能
  trailingSlash: true, // 为所有路径添加尾部斜杠（推荐）
};
```

**影响**：
- 构建后生成纯 HTML/CSS/JS 文件
- 可部署到任何静态托管服务（GitHub Pages、Cloudflare Pages 等）
- 无需 Node.js 服务器，托管成本接近零

#### 1.2 在所有页面添加静态配置
为所有使用 `getStaticProps` 的页面添加 `revalidate: false`：

```typescript
// src/pages/index.tsx
export async function getStaticProps() {
  // ... 现有代码
  return {
    props: { currentPosts },
    revalidate: false, // 🔥 禁用 ISR
  };
}

// src/pages/blog/[id].tsx
export async function getStaticProps({ params }) {
  // ... 现有代码
  return {
    props: { post, ... },
    revalidate: false, // 🔥 禁用 ISR
  };
}

export async function getStaticPaths() {
  // ... 现有代码
  return {
    paths,
    fallback: 'blocking', // 保持 blocking 模式
  };
}
```

**需要修改的文件**：
- ✅ `src/pages/index.tsx`
- ✅ `src/pages/blog/[id].tsx`
- ✅ `src/pages/Archives.tsx`
- ✅ `src/pages/Tags.tsx`
- ✅ `src/pages/search/index.tsx`
- ✅ 其他使用 `getStaticProps` 的页面

#### 1.3 检查 API 路由
**操作**：
```bash
# 查看所有 API 路由
dir src\pages\api /s /b
```

**评估 API 路由**：
- 如果有 API 路由，静态导出后无法使用
- 需要改为：
  - 构建时生成数据（推荐）
  - 迁移到外部 API 服务（如 Cloudflare Workers、Vercel Edge Functions）
  - 使用纯客户端数据获取

---

### 第二阶段：构建优化
**目标**：减小包体积，提升加载速度

#### 2.1 添加构建分析
```bash
# 分析当前构建产物
npm run analyze
```

**关注点**：
- 查看是否有过大的 chunk
- 检查是否有未使用的依赖
- 评估代码分割效果

#### 2.2 进一步优化 webpack 配置
在 `next.config.mjs` 中添加：

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization = {
      ...config.optimization,
      // 🔥 保留现有 splitChunks 配置
      splitChunks: {
        // ... 现有配置
        // 🔥 新增：更激进的分割策略
        maxSize: 244000, // 限制 chunk 大小为 244KB
      },
    };
  }
  return config;
}
```

#### 2.3 优化第三方脚本
在 `src/pages/_document.tsx` 中延迟加载非关键脚本：

```typescript
// 延迟加载分析脚本
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXX"
  strategy="afterInteractive"
/>

// 或使用 lazyOnload（不影响首屏）
<Script
  src="https://gc.zgo.at/count.js"
  data-goatcounter="https://suiyan.goatcounter.com/count"
  strategy="lazyOnload"
/>
```

---

### 第三阶段：组件优化
**目标**：减少客户端 JavaScript，提升交互性能

#### 3.1 进一步延迟加载 Giscus（已完成 ✅）
你已经做得很好，Giscus 已经使用动态导入 + ssr: false

#### 3.2 优化视频嵌入
在 `src/pages/blog/[id].tsx` 中，考虑延迟加载 Bilibili 视频：

```typescript
// 修改 iframe 组件为延迟加载
const BilibiliIframe = dynamic(() => import('@/components/BilibiliIframe'), {
  ssr: false,
  loading: () => <div className="aspect-video bg-gray-200" />,
});
```

#### 3.3 考虑添加骨架屏
为首页文章列表添加加载骨架屏（虽然是静态站点，但可提升感知性能）：

```typescript
// src/components/PostCardSkeleton.tsx
export default function PostCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-20 bg-gray-200 rounded" />
    </div>
  );
}
```

---

### 第四阶段：性能测试与验证
**目标**：确保优化后性能达标

#### 4.1 本地构建测试
```bash
# 构建生产版本
npm run build

# 启动静态服务器测试
npx serve@latest out

# 或使用 Python
python -m http.server 8000 --directory out
```

#### 4.2 性能指标测试
使用 Lighthouse 测试以下指标：
- **Performance**: 目标 > 95
- **First Contentful Paint (FCP)**: 目标 < 1.5s
- **Largest Contentful Paint (LCP)**: 目标 < 2.5s
- **Time to Interactive (TTI)**: 目标 < 3.5s
- **Cumulative Layout Shift (CLS)**: 目标 < 0.1

#### 4.3 检查构建产物
```bash
# 查看 out 目录大小
du -sh out

# 检查 HTML 文件是否生成
dir out /s /b | findstr ".html$"

# 检查是否有服务端代码残留
dir out /s /b | findstr "server"
```

---

### 第五阶段：部署优化（可选）
**目标**：选择最佳的静态托管服务

#### 5.1 推荐部署方案
| 服务商 | 优点 | 缺点 | 推荐度 |
|--------|------|------|--------|
| **Cloudflare Pages** | 全球 CDN、免费 SSL、自动部署 | 需要配置构建命令 | ⭐⭐⭐⭐⭐ |
| **Vercel** | Next.js 原生支持、预览部署 | 静态站点功能有限 | ⭐⭐⭐⭐ |
| **GitHub Pages** | 完全免费、简单 | 速度一般、无 CDN | ⭐⭐⭐ |
| **Netlify** | 免费额度大、表单功能 | 配置较复杂 | ⭐⭐⭐⭐ |

#### 5.2 Cloudflare Pages 配置示例
```yaml
# wrangler.toml
name = "suiyanblog"
type = "webpack"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "."
publish = "out"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

---

## 📝 预期效果

### 性能提升
- **首屏加载时间**: 减少 30-50%
- **Lighthouse 分数**: 从当前的 ~90 提升到 > 95
- **托管成本**: 从 $20/月 降至 $0（使用免费静态托管）

### 构建产物
- **HTML 文件**: 纯静态，无服务端代码
- **JavaScript**: 体积减少 20-30%（通过 tree-shaking）
- **图片**: 直接使用原文件（禁用优化）

### 部署灵活性
- ✅ 可部署到任何静态托管服务
- ✅ 支持自定义域名
- ✅ 全球 CDN 加速
- ✅ 无需维护服务器

---

## ⚠️ 注意事项

### 1. 图片优化限制
静态导出后无法使用 Next.js 图片优化，建议：
- 手动压缩图片（使用 TinyPNG、Squoosh）
- 使用 WebP/AVIF 格式
- 使用 CDN 加速图片加载

### 2. 功能限制
静态导出不支持：
- ❌ API 路由
- ❌ 中间件
- ❌ ISR（增量静态再生成）
- ❌ 图片优化

### 3. 降级策略
如果遇到问题，可以回退到 SSG：
```javascript
// next.config.mjs
output: undefined, // 移除 export 配置
images: {
  unoptimized: false, // 恢复图片优化
}
```

---

## 🎯 实施时间线

| 阶段 | 任务 | 预计时间 | 优先级 |
|------|------|----------|--------|
| **第一阶段** | 静态导出配置 | 2-3 小时 | 🔥 高 |
| **第二阶段** | 构建优化 | 1-2 小时 | 🔥 高 |
| **第三阶段** | 组件优化 | 2-3 小时 | 中 |
| **第四阶段** | 测试验证 | 1-2 小时 | 🔥 高 |
| **第五阶段** | 部署配置 | 1-2 小时 | 低 |

**总计**: 7-12 小时

---

## 📚 参考资源
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/vitals/)
- [Astro vs Next.js Performance](https://www.ryanfiller.com/blog/astro-vs-nextjs-performance)

---

## ✅ 检查清单

完成优化后，使用以下清单验证：

- [ ] `next.config.mjs` 已添加 `output: 'export'`
- [ ] `images.unoptimized: true` 已设置
- [ ] 所有页面已添加 `revalidate: false`
- [ ] API 路由已迁移或移除
- [ ] 构建成功，无错误
- [ ] Lighthouse Performance > 95
- [ ] 所有页面可正常访问
- [ ] 图片正常显示
- [ ] 评论功能正常
- [ ] 搜索功能正常
- [ ] RSS/Feed 正常生成
- [ ] 已部署到静态托管服务

---

**开始优化时间**: ___________
**完成优化时间**: ___________
**优化结果**: ___________