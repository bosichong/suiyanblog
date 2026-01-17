import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import config from "@/config";
import MenuItem from './MenuItem';
import Avatar from './Avatar';
import SNSList from "./SNSList";
import { MenuIcon } from "./icons/MenuIcon";
import { XIcon } from "./icons/XIcon";

export default function Nav() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [randomIndex, setRandomIndex] = useState<number | null>(null);

    useEffect(() => {
        // 生成一个随机索引
        setRandomIndex(Math.floor(Math.random() * config.menuItems.length));
    }, []); // 空依赖数组确保只在组件挂载时运行一次


    return (
        <Navbar className="block md:hidden max-w-full" maxWidth="sm">
            <NavbarContent>

                <NavbarBrand className="block md:hidden">
                    <Link color="primary" href="/" className="text-lg">{config.BLOG_NAME_EN}</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="block md:hidden">
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem className="block md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative w-10 h-10 rounded-full flex items-center justify-center bg-content2/50 dark:bg-content3/50 hover:bg-content3/80 dark:hover:bg-content2/80 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none shadow-sm hover:shadow-md"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <XIcon size={20} className="text-foreground" /> : <MenuIcon size={20} className="text-foreground" />}
                    </button>
                </NavbarItem>
            </NavbarContent>
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 p-4 flex flex-col gap-4 bg-content1 dark:bg-content1 border-t border-divider shadow-lg">
                    <ul className="flex flex-col justify-between space-y-4 px-2">
                        <li className="mb-4 flex justify-center">
                            <Avatar />
                        </li>

                        <li className="mb-4 flex justify-center">
                            <SNSList/>
                        </li>

                        {config.menuItems.map((item, index) => (
                            <MenuItem
                                key={`${item}-${index}`}
                                item={item}
                                index={index}
                                onClick={() => setIsMenuOpen(false)}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </Navbar>
    );
}