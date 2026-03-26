'use client'

import { useEffect, useRef } from 'react'

interface TwikooCommentsProps {
  path: string
}

declare global {
  interface Window {
    twikoo?: any
    __twikooScriptLoaded?: boolean
    __twikooInitializedPaths?: Set<string>
  }
}

export default function TwikooComments({ path }: TwikooCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    // 确保在客户端执行
    if (typeof window === 'undefined') return

    // 初始化全局状态
    if (!window.__twikooInitializedPaths) {
      window.__twikooInitializedPaths = new Set()
    }

    // 检查是否已经为这个 path 初始化过
    if (window.__twikooInitializedPaths.has(path)) {
      console.log('Twikoo already initialized for path:', path)
      return
    }

    // 加载 Twikoo 脚本
    const loadTwikooScript = async () => {
      // 检查是否已经加载过脚本
      if (window.__twikooScriptLoaded || window.twikoo) {
        console.log('Twikoo script already loaded')
        return
      }

      // 检查 DOM 中是否已存在 Twikoo 脚本标签
      const existingScript = document.querySelector('script[src*="twikoo.all.min.js"]')
      if (existingScript) {
        console.log('Twikoo script tag already exists in DOM')
        window.__twikooScriptLoaded = true
        return
      }

      console.log('Loading Twikoo script...')
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/twikoo@1.7.4/dist/twikoo.all.min.js'
      script.async = true
      script.setAttribute('data-twikoo-script', 'loaded')
      document.head.appendChild(script)
      
      await new Promise<void>((resolve) => {
        script.onload = () => {
          window.__twikooScriptLoaded = true
          console.log('Twikoo script loaded')
          resolve()
        }
        script.onerror = () => {
          console.error('Twikoo script failed to load')
          resolve()
        }
      })
    }

    // 初始化 Twikoo
    const initTwikoo = async () => {
      await loadTwikooScript()

      // 等待 Twikoo 可用
      const waitForTwikoo = () => {
        return new Promise<void>((resolve) => {
          const check = () => {
            if (window.twikoo) {
              resolve()
            } else {
              setTimeout(check, 100)
            }
          }
          check()
        })
      }

      await waitForTwikoo()

      // 初始化 Twikoo
      if (!initializedRef.current && containerRef.current) {
        initializedRef.current = true
        window.__twikooInitializedPaths.add(path)

        try {
          console.log('Initializing Twikoo for path:', path)
          window.twikoo.init({
            envId: 'https://twikoo.suiyan.cc/.netlify/functions/twikoo',
            el: '#twikoo-comment',
            path: path
          })
        } catch (e) {
          console.error('Twikoo init error:', e)
        }
      }
    }

    initTwikoo()

    // 不需要清理，因为初始化是全局的
  }, [path])

  return (
    <div 
      ref={containerRef}
      className="no-pico"
      id="twikoo-comment" 
      style={{ minHeight: '200px' }}
    />
  )
}