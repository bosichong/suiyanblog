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
        <div className="relative">
            <button
                aria-label="切换主题"
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
                onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark";
                    setTheme(newTheme);
                    saveThemeToLocalStorage(newTheme);
                }}
            >
                <div className="transform transition-transform duration-300 ease-in-out hover:rotate-12">
                    <IconComponent className="w-5 h-5 text-foreground" />
                </div>
            </button>
        </div>
    );
}
