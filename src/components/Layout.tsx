import Footer from "./Footer";
import Nav from "./Nav";
import config from "@/config";
import Avatar from "@/components/Avatar";
import MenuItem from './MenuItem';
import ThemeButton from "@/components/ThemeButton";
import SNSList from "@/components/SNSList";
import BackToTop from "@/components/BackToTop";
import { LayoutProps } from '../types';
import { motion } from "motion/react";

const Layout = ({ children }: LayoutProps) => {
    return (
        <>

        <Nav/>
        <div className={'flex h-full flex-col items-center justify-start font-sans md:relative md:flex-row md:items-start md:justify-center'}>


            <nav className="ml-8 hidden w-32 md:sticky md:top-36 md:block">
                <ul className={'flex flex-col justify-between'}>
                    <motion.li
                        
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                    >
                        <Avatar />
                    </motion.li>
                    <motion.li
                        
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        <SNSList/>
                    </motion.li>

                    {config.menuItems.map((item, index) => (
                        <motion.li
                            key={`${item}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.15 + index * 0.05 }}
                        >
                            <MenuItem item={item} index={index} />
                        </motion.li>
                    ))}
                </ul>



            </nav>
            <main className={'w-full px-2 py-4 leading-normal font-extralight md:max-w-[720px]'}>
                {children}
                <Footer/>
            </main>


        </div>

            <ThemeButton />
            <BackToTop />

        </>
    )
        ;
};

export default Layout;