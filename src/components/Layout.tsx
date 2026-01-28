import Footer from "./Footer";
import Nav from "./Nav";
import BackToTop from "./BackToTop";
import { LayoutProps } from '../types';

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Nav />
            <div className="flex flex-col items-center min-h-screen pt-14">
                <main className="w-full max-w-2xl px-4 py-8 font-sans">
                    {children}
                    <Footer />
                </main>
            </div>
            <BackToTop />
        </>
    );
};

export default Layout;