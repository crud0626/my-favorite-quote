import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
    return (
        <>
            <GlobalStyle />
                <Header />
                <Main />
        </>
    );
};

export default App;