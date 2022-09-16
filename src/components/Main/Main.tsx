import React from 'react';
import styled from 'styled-components';
import Nav from '~/components/Main/Nav/Nav';
import Section from '~/components/Main/Section/Section';
import { IUserInfo } from '~/services/authService';
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { IQuoteData, IQuotesState } from '~/types/interface';
import { CardPositionType } from '~/types/type';

interface IProps {
    isNavOpen: boolean;
    displayQuotes: IQuotesState;
    historyList: IQuoteData[];
    favoriteList: IQuoteData[];
    cardPosition: CardPositionType;
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    requestData(id?: string): Promise<any>;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
    onChangeFavorite(target: IQuoteData): void;
    onClickNavContent(target: IQuoteData): void;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen, displayQuotes, historyList, cardPosition, favoriteList, userInfo, isLoggedIn, requestData, handleNav, handleLoginBox, onLogout, onChangeFavorite, onClickNavContent }: IProps) => {
    return(
        <StyledMain>
            <Section 
                displayQuotes={displayQuotes}
                cardPosition={cardPosition}
                requestData={requestData}
                onChangeFavorite={onChangeFavorite}
            />
            <Nav 
                isNavOpen={isNavOpen} 
                historyList={historyList}
                userInfo={userInfo}
                isLoggedIn={isLoggedIn}
                favoriteList={favoriteList}
                onClickNavContent={onClickNavContent}
                handleNav={handleNav}
                handleLoginBox={handleLoginBox}
                onLogout={onLogout}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledMain>
    );
}

export default Main;