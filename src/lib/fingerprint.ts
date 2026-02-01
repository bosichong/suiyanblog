import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise: Promise<any> | null = null

export async function getFingerprint(): Promise<string> {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load().then(fp => fp.get())
  }
  const result = await fpPromise
  return result.visitorId
}

// 备用方案：如果 fingerprintjs 加载失败，使用简单哈希
// 确保只在浏览器环境中调用
export function getSimpleFingerprint(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    // 服务端回退：使用时间戳 + 随机数
    return `server-${Date.now()}-${Math.random().toString(36).substring(7)}`
  }
  
  const seed = navigator.userAgent + navigator.language + screen.width + screen.height
  return btoa(seed).slice(0, 32)
}