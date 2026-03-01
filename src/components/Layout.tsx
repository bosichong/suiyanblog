import Footer from "./Footer";
import Nav from "./Nav";
import BackToTop from "./BackToTop";
import { LayoutProps } from '../types';

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="container">
                <Nav />
                <main>
                    {children}
                    
                </main>
                <Footer />
            </div>
            <BackToTop />
        </>
    );
};

export default Layout;