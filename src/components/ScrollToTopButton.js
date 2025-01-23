import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import GoUp from "@/components/ico/GoUp";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";

const ScrollToTopButton = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="hidden md:block fixed w-8 bottom-20 right-5 p-2  hover:opacity-80 cursor-pointer">
                <ThemeSwitcher  />
            </div>

            {isVisible && (
                <label size={"sm"} radius={"full"} onClick={scrollToTop}
                       className="fixed w-8 bottom-10 right-4 p-2 transition-opacity hover:opacity-80 cursor-pointer">
                    <GoUp/>
                </label>
            )
            }
        </>

    );
};

export default ScrollToTopButton;
