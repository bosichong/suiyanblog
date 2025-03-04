import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import GoUp from "@/components/ico/GoUp";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const ScrollToTopButton = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // 使用节流函数优化滚动事件处理
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // 初始检查滚动位置
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed z-50 flex flex-col items-center gap-3 right-5 bottom-10">
            <div className="hidden md:block transition-all duration-300 ease-in-out hover:scale-110">
                <ThemeSwitcher />
            </div>
            
            <Button
                isIconOnly
                aria-label="返回顶部"
                title="返回顶部"
                size="sm"
                radius="full"
                className={`bg-content1 shadow-md transition-all duration-300 ${isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'} hover:opacity-100 hover:scale-110`}
                onClick={scrollToTop}
            >
                <GoUp />
            </Button>
        </div>
    );
};

export default ScrollToTopButton;
