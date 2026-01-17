import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // 监听滚动事件，控制按钮显示/隐藏
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
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

    return (
        <div className={`fixed bottom-24 right-5 z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'}`}>
            <button
                aria-label="返回顶部"
                className={`
                    relative
                    w-10 h-10
                    rounded-full
                    flex items-center justify-center
                    bg-content2/50 dark:bg-content3/50
                    hover:bg-content3/80 dark:hover:bg-content2/80
                    transition-all duration-300 ease-in-out
                    transform hover:scale-110
                    focus:outline-none
                    shadow-sm hover:shadow-md
                `}
                onClick={scrollToTop}
            >
                <ArrowUpIcon size={20} className="text-foreground" />
            </button>
        </div>
    );
};

export default BackToTop;