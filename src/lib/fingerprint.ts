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
export function getSimpleFingerprint(): string {
  const seed = navigator.userAgent + navigator.language + screen.width + screen.height
  return btoa(seed).slice(0, 32)
}