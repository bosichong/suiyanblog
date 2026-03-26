'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import GiscusComments from './GiscusComments'

// 动态加载 Twikoo，避免 SSR 问题
const TwikooComments = dynamic(() => import('./TwikooComments'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-color)' }}>
      加载评论中...
    </div>
  )
})

type CommentType = 'twikoo' | 'giscus'

interface CommentSectionProps {
  postId: string
  postPath: string
}

export default function CommentSection({ postId, postPath }: CommentSectionProps) {
  const [commentType, setCommentType] = useState<CommentType>('giscus')
  const [currentTheme, setCurrentTheme] = useState('light')

  // 监听主题变化
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light'
      setCurrentTheme(theme)
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  // 当主题变化时，通知 Twikoo 更新主题
  // 注意：Twikoo 组件自己会处理初始化，这里不需要重复调用 init
  // Twikoo 会自动检测主题变化并更新样式

  // 切换评论类型时使用 key 强制重新渲染
  const handleSwitchComment = useCallback((type: CommentType) => {
    if (type !== commentType) {
      setCommentType(type)
    }
  }, [commentType])

  return (
    <div className="comment-section">
      {/* 评论系统选择器 */}
      <div className="comment-selector" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => handleSwitchComment('giscus')}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--form-element-border-color, #ccc)',
            background: commentType === 'giscus' ? 'var(--primary, #4a9eff)' : 'var(--card-bg, #fff)',
            color: commentType === 'giscus' ? '#fff' : 'var(--color, inherit)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
          }}
        >
          💭 GitHub 讨论
        </button>
        <button
          onClick={() => handleSwitchComment('twikoo')}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--form-element-border-color, #ccc)',
            background: commentType === 'twikoo' ? 'var(--primary, #4a9eff)' : 'var(--card-bg, #fff)',
            color: commentType === 'twikoo' ? '#fff' : 'var(--color, inherit)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem'
          }}
        >
          💬 Twikoo 评论
        </button>
      </div>

      {/* 评论内容区域 - 使用 key 确保切换时完全重新挂载 */}
      <div className="comment-content" key={`comment-${commentType}`}>
        {commentType === 'twikoo' ? (
          <TwikooComments path={postPath} />
        ) : (
          <GiscusComments postId={postId} />
        )}
      </div>
    </div>
  )
}

// 声明全局 twikoo 类型
declare global {
  interface Window {
    twikoo?: any
  }
}