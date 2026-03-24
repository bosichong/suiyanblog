'use client'

import { useEffect, useState } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';

export default function ThemeSwitcher() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

    useEffect(() => {
        // 从 localStorage 读取主题模式偏好
        const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
        const initialThemeMode = savedThemeMode || 'auto';
        setThemeMode(initialThemeMode);
        applyTheme(initialThemeMode);
    }, []);

    const applyTheme = (mode: ThemeMode) => {
        let theme: 'light' | 'dark';
        
        if (mode === 'auto') {
            // 自动：根据系统偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        } else {
            // 手动设置
            theme = mode;
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        
        // 更新 Giscus 主题
        const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
        if (iframe) {
            iframe.contentWindow?.postMessage(
                { giscus: { setConfig: { theme } } },
                'https://giscus.app'
            );
        }
    };

    const toggleTheme = () => {
        const modes: ThemeMode[] = ['auto', 'light', 'dark'];
        const currentIndex = modes.indexOf(themeMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        
        setThemeMode(nextMode);
        localStorage.setItem('themeMode', nextMode);
        applyTheme(nextMode);
    };

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                toggleTheme();
            }}
            data-tooltip="点击切换主题模式"
            aria-label={`切换主题模式，当前为${themeMode === 'auto' ? 'Auto' : themeMode === 'light' ? 'Light' : 'Dark'}模式`}
            role="button"
            tabIndex={0}
        >
            {themeMode === 'auto' ? 'Auto' : themeMode === 'light' ? 'Light' : 'Dark'} Theme
        </a>
    );
}