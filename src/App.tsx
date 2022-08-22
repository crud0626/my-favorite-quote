import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    
    const handleNav = () => setIsNavOpen(state => !state);

    return (
        <>
            <GlobalStyle />
                <Header 
                    isNavOpen={isNavOpen} 
                    handleNav={handleNav}
                />
                <Main isNavOpen={isNavOpen} />
                <Footer />
        </>
    );
};

export default App;