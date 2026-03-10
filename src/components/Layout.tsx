import Footer from "./Footer";
import Nav from "./Nav";
import BackToTop from "./BackToTop";
import { LayoutProps } from '../types';

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header className="container">
                <Nav />
            </header>
            <main className="container">
                {children}
            </main>
            <footer className="container">
                <Footer />
            </footer>
            <BackToTop />
        </>
    );
};

export default Layout;