'use client'

import { useEffect, useState } from 'react'
import Giscus from '@giscus/react';

interface GiscusCommentsProps {
    postId?: string;
}

export default function GiscusComments({ postId }: GiscusCommentsProps) {
    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    // 确保组件只在客户端挂载后才渲染
    useEffect(() => {
        setMounted(true)
    }, [])

    // 监听主题变化
    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
            setTheme(currentTheme)
        }

        updateTheme()

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        return () => observer.disconnect()
    }, [])

    if (!mounted) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>加载评论中...</div>
    }

    return (
        <Giscus
            repo="bosichong/suiyanblog"
            repoId="R_kgDONjg2qw"
            category="Announcements"
            categoryId="DIC_kwDONjg2q84ClnrC"
            mapping="pathname"
            lang="zh-CN"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={theme === 'dark' ? 'dark' : 'light'}
        />
    );
}