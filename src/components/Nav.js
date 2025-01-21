import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from "@nextui-org/react";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import config from "@/config";


export default function Nav() {


    const [randomIndex, setRandomIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    useEffect(() => {
        // 生成一个随机索引
        setRandomIndex(Math.floor(Math.random() * config.menuItems.length));
    }, []); // 空依赖数组确保只在组件挂载时运行一次
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>

                <NavbarBrand>
                    <Link color="primary" href={'/'} >{config.BLOG_NAME_EN}</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {config.menuItems.map((item, index) => (
                    <NavbarMenuItem
                        key={`${item}-${index}`}
                        isActive={item.isActive}
                    >
                        <Link
                            className={
                                index === randomIndex
                                    ? "w-full motion-preset-seesaw hover:animate-none"
                                    : "w-full hover:motion-preset-shake "
                            }
                            href={`${item.href}`}
                            size="md"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />

            </NavbarContent>
            <NavbarMenu>
                {config.menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href={`${item.href}`}
                            size="md"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

