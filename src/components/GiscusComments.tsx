'use client'

import dynamic from 'next/dynamic';

const Giscus = dynamic(() => import('@giscus/react').then((mod) => mod.default), {
    ssr: false,
    loading: () => <div>加载评论中...</div>
});

interface GiscusCommentsProps {
    key?: string;
}

export default function GiscusComments({ key: propKey }: GiscusCommentsProps) {
    // 动态获取当前主题
    const getTheme = () => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
        return 'light';
    };

    return (
        <Giscus
            key={propKey}
            repo="bosichong/suiyanblog"
            repoId="R_kgDONQk8gA"
            category="Announcements"
            categoryId="DIC_kwDONQk8gM4COX0M"
            mapping="pathname"
            lang="zh-CN"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={getTheme()}
        />
    );
}