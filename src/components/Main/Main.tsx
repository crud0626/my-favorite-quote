import React from 'react';
import styled from 'styled-components';
import Nav from './Nav/Nav';
import Section from './Section/Section';
import { CardPositionType, QuoteStateType } from '../../App';
import { QuoteData } from '../../services/quotesApi';
import { IUserInfo } from '../../services/authService';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';

interface IProps {
    isNavOpen: boolean;
    quoteData: QuoteStateType;
    quoteHistory: QuoteData[];
    exposedCard: CardPositionType;
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    requestData(id?: string): Promise<any>;
    handleNav(): void;
    onLogin(): Promise<void>;
    onLogout(): Promise<void>;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen, quoteData, quoteHistory, exposedCard, userInfo, isLoggedIn, requestData, handleNav, onLogin, onLogout }: IProps) => {
    return(
        <StyledMain>
            <Section 
                quoteData={quoteData}
                requestData={requestData}
                exposedCard={exposedCard}
            />
            <Nav 
                isNavOpen={isNavOpen} 
                quoteHistory={quoteHistory}
                userInfo={userInfo}
                isLoggedIn={isLoggedIn}
                requestData={requestData}
                handleNav={handleNav}
                onLogin={onLogin}
                onLogout={onLogout}
            />
        </StyledMain>
    );
}

export default Main;