import Header from './Header'
// import Main from './Main/main'
import Footer from './Footer'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function Layout({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout;