import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sun from "@/components/ico/Sun";
import Moon from "@/components/ico/Moon";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // 根据当前主题显示相应的图标
    const IconComponent = theme === "dark" ? Sun : Moon;

    return (
        <div>

            <label className={"group relative max-w-fit touch-none tap-highlight-transparent select-none p-1 w-8 transition-opacity hover:opacity-80 cursor-pointer rounded-full h-full min-w-8 min-h-8 flex items-center justify-center"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <IconComponent />
            </label>

        </div>
    );
}
