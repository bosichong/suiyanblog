import React, {useEffect, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    Link,
} from "@nextui-org/react";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import config from "@/config";
import MenuItem from './MenuItem';
import Avatar from './Avatar';
import SNSList from "./SNSList";

export default function Nav() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [randomIndex, setRandomIndex] = useState<number | null>(null);

    useEffect(() => {
        // 生成一个随机索引
        setRandomIndex(Math.floor(Math.random() * config.menuItems.length));
    }, []); // 空依赖数组确保只在组件挂载时运行一次


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className={'block md:hidden max-w-full'} maxWidth="sm">
            <NavbarContent>

                <NavbarBrand className={'block md:hidden'}>
                    <Link color="primary" href={'/'} className="text-lg">{config.BLOG_NAME_EN}</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className={'block md:hidden'}>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
            </NavbarContent>
            <NavbarMenu className="pt-6 pb-6 gap-4 bg-background/70 backdrop-blur-lg dark:bg-default-100/50">
                <ul className={'flex flex-col justify-between space-y-4 px-2'}>
                    <li className={'mb-4 flex justify-center'}>
                        <Avatar />
                    </li>

                    <li className={'mb-4 flex justify-center'}>
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
            </NavbarMenu>
        </Navbar>
    );
}