import React, {useEffect, useState} from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
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
        <>
            <nav className="block md:hidden w-full px-4 py-3 bg-background/80 backdrop-blur-md sticky top-0 z-40 will-change-transform">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-lg font-medium text-primary">
                        {config.BLOG_NAME_EN}
                    </Link>

                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-default-100 dark:bg-default-50 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none shadow-sm hover:shadow-md"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} className="text-foreground" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={20} className="text-foreground" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-background dark:bg-background shadow-2xl z-50 md:hidden overflow-y-auto will-change-transform"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold text-primary"> </h2>
                                    <motion.button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-default-100 dark:bg-default-50 hover:bg-primary hover:text-white transition-all duration-300"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X size={20} className="text-foreground" />
                                    </motion.button>
                                </div>

                                <motion.ul
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col space-y-6"
                                >
                                    <motion.li
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 }}
                                        className="flex justify-center py-2"
                                    >
                                        <Avatar />
                                    </motion.li>

                                    <motion.li
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex justify-center py-2"
                                    >
                                        <SNSList/>
                                    </motion.li>

                                    {config.menuItems.map((item, index) => (
                                        <motion.li
                                            key={`${item}-${index}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 + index * 0.03 }}
                                        >
                                            <MenuItem
                                                item={item}
                                                index={index}
                                                onClick={() => setIsMenuOpen(false)}
                                            />
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}