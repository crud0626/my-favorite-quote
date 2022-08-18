import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <>
            <GlobalStyle />
                <Header />
                <Main />
                <Footer />
        </>
    );
};

export default App;