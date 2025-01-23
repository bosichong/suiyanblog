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

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>

                <NavbarBrand className={'block md:hidden'}>
                    <Link color="primary" href={'/'} >{config.BLOG_NAME_EN}</Link>
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

