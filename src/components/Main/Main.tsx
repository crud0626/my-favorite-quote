import React, { MutableRefObject } from 'react';
import Nav from '~/components/Nav/Nav';
import Section from '~/components/Main/Section/Section';
import { StyledMain } from './StyledMain';
import { IQuoteData, IQuotesState, IUserInfo } from '~/types/interface';
import { CardPositionType, ChevronEventType } from '~/types/type';

interface IProps {
    cardWrapperRef: MutableRefObject<HTMLDivElement | null>;
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
    handleCardFilp(direction: ChevronEventType): void;
    onLogout(): Promise<void>;
    onChangeFavorite(target: IQuoteData): void;
    onClickNavContent(target: IQuoteData): void;
}

const Main = ({ cardWrapperRef, isNavOpen, displayQuotes, historyList, cardPosition, favoriteList, userInfo, isLoggedIn, requestData, handleNav, handleLoginBox, onLogout, onChangeFavorite, onClickNavContent }: IProps) => {
    return(
        <StyledMain>
            <Section 
                cardWrapperRef={cardWrapperRef}
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