

import Footer from "./Footer";
import Nav from "./Nav";
import config from "@/config";
import Avatar from "@/components/Avatar";
import MenuItem from './MenuItem';
import ThemeButton from "@/components/ThemeButton";
import SNSList from "@/components/SNSList";
import BackToTop from "@/components/BackToTop";


const Layout = ({ children }) => {// 空依赖数组确保只在组件挂载时运行一次
    return (
        <>

        <Nav/>
        <div className={'flex h-full flex-col items-center justify-start font-sans md:relative md:flex-row md:items-start md:justify-center'}>


            <nav className="top-36 ml-8 hidden w-32 motion-preset-blur-right md:sticky md:block">
                <ul className={'flex flex-col justify-between'}>
                    <li className={'mb-4'}>
                        <Avatar />
                    </li>

                    <li className={'mb-4'}>
                        <SNSList/>
                    </li>

                    {config.menuItems.map((item, index) => (
                        <MenuItem key={`${item}-${index}`} item={item} index={index} />
                    ))}
                </ul>



            </nav>
            <main className={'w-full px-2 py-4 leading-normal font-extralight md:max-w-4xl'}>
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
