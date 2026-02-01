'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getFingerprint, getSimpleFingerprint } from '@/lib/fingerprint'

interface ArticleStatsProps {
  slug: string
  mode?: 'like' | 'views' | 'both'
}

interface Stats {
  views: number
  likes: number
  liked: boolean
}

export default function ArticleStats({ slug, mode = 'like' }: ArticleStatsProps) {
  const [stats, setStats] = useState<Stats>({ views: 0, likes: 0, liked: false })
  const [fingerprint, setFingerprint] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // 初始化：获取指纹和统计数据
  useEffect(() => {
    const init = async () => {
      try {
        const fp = await getFingerprint().catch(() => getSimpleFingerprint())
        setFingerprint(fp)

        // 并行获取统计数据和喜欢状态
        const [statsRes, likeRes] = await Promise.all([
          fetch(`/api/stats?slug=${encodeURIComponent(slug)}`),
          fetch(`/api/stats/like?slug=${encodeURIComponent(slug)}&fingerprint=${fp}`)
        ])

        const statsData = await statsRes.json()
        const likeData = await likeRes.json()

        setStats({
          views: statsData.views,
          likes: statsData.likes,
          liked: likeData.liked
        })

        // 增加阅读量（只在首次加载时）
        await fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug })
        })

        // 更新本地阅读量显示（乐观更新）
        setStats(prev => ({ ...prev, views: prev.views + 1 }))
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [slug])

  // 处理喜欢点击
  const handleLike = useCallback(async () => {
    if (!fingerprint) return

    // 乐观更新 UI
    setStats(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }))

    try {
      const res = await fetch('/api/stats/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, fingerprint })
      })

      const data = await res.json()
      
      // 同步服务器返回的真实数据
      setStats(prev => ({
        ...prev,
        liked: data.liked,
        likes: data.likes
      }))
    } catch (error) {
      // 失败时回滚
      setStats(prev => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes + 1 : prev.likes - 1
      }))
      console.error('Failed to toggle like:', error)
    }
  }, [slug, fingerprint])

  if (loading) {
    // 显示加载占位符，避免水合不匹配
    // 只显示阅读量
    if (mode === 'views') {
      return <div className="flex items-center gap-2 text-text-secondary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>-- 阅读</span>
      </div>
    }

    // 只显示喜欢按钮或显示完整统计
    return (
      <div className="relative group inline-block">
        <button
          className="text-text-secondary"
          aria-label="加载中"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    )
  }

  // 只显示阅读量
  if (mode === 'views') {
    return (
      <div className="flex items-center gap-2 text-text-secondary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{stats.views.toLocaleString()} 阅读</span>
      </div>
    )
  }

  // 只显示喜欢按钮
  if (mode === 'like') {
    return (
      <div className="relative group inline-block">
        <motion.button
          onClick={handleLike}
          className={stats.liked ? 'text-red-500' : 'text-text-secondary'}
          aria-label={stats.liked ? '取消喜欢' : '喜欢'}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={stats.liked ? {
            scale: 1.15,
            rotate: 10
          } : {
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <svg
            className="w-7 h-7"
            fill={stats.liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
        {/* 喜欢数量徽标 */}
        {stats.likes > 0 && (
          <motion.span
            className="absolute -top-1 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {stats.likes > 99 ? '99+' : stats.likes}
          </motion.span>
        )}
        {/* Hover 提示 */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-text-primary text-bg-content text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {stats.liked ? '已喜欢' : '喜欢这篇文章'}
        </div>
      </div>
    )
  }

  // 显示完整统计（阅读量 + 喜欢按钮）
  return (
    <div className="flex items-center gap-6">
      {/* 阅读量 */}
      <div className="flex items-center gap-2 text-text-secondary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{stats.views.toLocaleString()} 阅读</span>
      </div>

      {/* 喜欢按钮 */}
      <div className="relative group inline-block">
        <motion.button
          onClick={handleLike}
          className={stats.liked ? 'text-red-500' : 'text-text-secondary'}
          aria-label={stats.liked ? '取消喜欢' : '喜欢'}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={stats.liked ? {
            scale: 1.15,
            rotate: 10
          } : {
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <svg
            className="w-7 h-7"
            fill={stats.liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
        {/* 喜欢数量徽标 */}
        {stats.likes > 0 && (
          <motion.span
            className="absolute -top-1 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {stats.likes > 99 ? '99+' : stats.likes}
          </motion.span>
        )}
        {/* Hover 提示 */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-text-primary text-bg-content text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {stats.liked ? '已喜欢' : '喜欢这篇文章'}
        </div>
      </div>
    </div>
  )
}