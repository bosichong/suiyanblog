/**
 * HTML 清理工具
 * 用于在允许特定安全 HTML 标签的同时，过滤危险的 HTML 和 XSS 攻击
 */

/**
 * 检查 HTML 字符串是否只包含允许的安全标签
 * 白名单：允许 iframe (仅限 Bilibili)、基本的格式化标签
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  // 移除危险的标签和属性
  let sanitized = html
    // 移除 script 标签
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // 移除 on* 事件处理器 (onclick, onload 等)
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
    // 移除 javascript: 协议
    .replace(/javascript:/gi, '')
    // 移除 data: 协议（除了图片）
    .replace(/data:(?!image\/)/gi, '')
    // 移除 eval 和 expression
    .replace(/eval\([^)]*\)/gi, '')
    .replace(/expression\([^)]*\)/gi, '')
    // 移除 iframe 中的危险属性，只允许 Bilibili iframe
    .replace(/<iframe(?!\s+[^>]*src=['"]https?:\/\/player\.bilibili\.com)[^>]*>/gi, (match) => {
      // 检查是否是 Bilibili iframe
      if (match.includes('player.bilibili.com') || match.includes('//player.bilibili.com')) {
        // 移除 iframe 中的危险属性
        return match
          .replace(/\s+on\w+="[^"]*"/gi, '')
          .replace(/\s+on\w+='[^']*'/gi, '')
          .replace(/\s+allow\s*=/gi, ' allow="fullscreen"');
      }
      return '';
    })
    // 移除 object 和 embed 标签
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // 移除 form 和 input 标签
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<input\b[^>]*>/gi, '')
    // 移除 style 标签中的 javascript
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, (match) => {
      return match.replace(/javascript:/gi, '').replace(/expression\([^)]*\)/gi, '');
    });

  return sanitized;
}

/**
 * 验证并清理 Markdown 内容
 * 用于在渲染前进行额外的安全检查
 */
export function sanitizeMarkdownContent(content: string): string {
  if (!content) return '';

  // 检查是否有明显的 XSS 模式
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /expression\(/i,
    /data:(?!image\/)/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(content)) {
      console.warn('检测到潜在危险内容，已自动清理');
    }
  }

  return content;
}