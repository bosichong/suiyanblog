import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sun from "@/components/ico/Sun";
import Moon from "@/components/ico/Moon";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // 保存主题到 localStorage
    const saveThemeToLocalStorage = (newTheme) => {
        localStorage.setItem('theme', newTheme);
    };

    // 从 localStorage 加载主题
    const loadThemeFromLocalStorage = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    };

    // 初始化时加载主题
    useEffect(() => {
        loadThemeFromLocalStorage();
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // 根据当前主题显示相应的图标
    const IconComponent = theme === "dark" ? Sun : Moon;

    return (
        <div>
            <label className={"group relative max-w-fit touch-none tap-highlight-transparent select-none p-1 w-8 transition-opacity hover:opacity-80 cursor-pointer rounded-full h-full min-w-8 min-h-8 flex items-center justify-center"}
                onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark";
                    setTheme(newTheme);
                    saveThemeToLocalStorage(newTheme);
                }}>
                <IconComponent />
            </label>
        </div>
    );
}
