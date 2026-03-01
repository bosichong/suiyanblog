"use client";

import { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';

const BackToTop = () => {
    // 初始化为 false，确保服务端和客户端渲染一致
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // 组件挂载后再启用滚动监听
    useEffect(() => {
        setIsMounted(true);
        
        let lastScrollY = window.scrollY;

        // 根据滚动方向显示/隐藏按钮
        const toggleVisibility = () => {
            const currentScrollY = window.scrollY;
            
            // 只在向上滚动且滚动超过300px时显示
            if (currentScrollY < lastScrollY && currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // 平滑滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 组件未挂载前不渲染，避免水合不匹配
    if (!isMounted) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', bottom: '6rem', right: '1rem', zIndex: 1000 }}>
            <button
                aria-label="返回顶部"
                onClick={scrollToTop}
                style={{ display: isVisible ? 'block' : 'none' }}
            >
                <ArrowUpIcon size={16} />
            </button>
        </div>
    );
};

export default BackToTop;