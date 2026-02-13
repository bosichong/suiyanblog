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
        <div className={`fixed bottom-24 right-5 z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
                aria-label="返回顶部"
                className={`
                    relative
                    w-8 h-8
                    rounded-full
                    flex items-center justify-center
                    bg-black
                    hover:bg-black/80
                    transition-all duration-300 ease-in-out
                    transform hover:scale-110
                    focus:outline-none
                    shadow-sm hover:shadow-md
                `}
                onClick={scrollToTop}
            >
                <ArrowUpIcon size={16} className="text-white" />
            </button>
        </div>
    );
};

export default BackToTop;