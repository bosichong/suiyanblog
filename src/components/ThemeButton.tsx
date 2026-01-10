import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const ThemeButton = () => {

    return (
        <div className="fixed z-50 flex flex-col items-center gap-3 right-5 bottom-10">
            <div className="hidden md:block transition-all duration-300 ease-in-out hover:scale-110">
                <ThemeSwitcher />
            </div>


        </div>
    );
};

export default ThemeButton;