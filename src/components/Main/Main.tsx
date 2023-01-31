import React, { MutableRefObject } from 'react';
import Nav from '~/components/Nav/Nav';
import Card from './Card/Card';
import ChevronBox from './ChevronBox/ChevronBox';
import { CardWrapper, StyledMain } from './Main.styles';
import { IQuoteData, IQuotesState, IUserInfo } from '~/types/interface';
import { CardPositionType, ChevronEventType } from '~/types/type';
import { downloadToImg } from '~/services/html2canvas';

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

const cardPositions: CardPositionType[] = ['front', 'back'];

const Main = ({ cardWrapperRef, isNavOpen, displayQuotes, historyList, cardPosition, favoriteList, userInfo, isLoggedIn, requestData, handleNav, handleLoginBox, onLogout, onChangeFavorite, onClickNavContent }: IProps) => {
    const onDownload = (): void => {
        if(cardWrapperRef.current) {
            downloadToImg(cardWrapperRef.current);
        }
    }

    return(
        <StyledMain>
            <section className='section'>
                <div className='card_section'>
                    <CardWrapper ref={cardWrapperRef}>
                        {cardPositions.map((position, i) => (
                            <Card 
                                key={i}
                                position={position} 
                                cardPosition={cardPosition}
                                quoteContent={displayQuotes[position]}
                                onDownload={onDownload}
                                onChangeFavorite={onChangeFavorite}
                            />
                        ))}
                    </CardWrapper>
                    <ChevronBox requestData={requestData} />
                </div>
            </section>
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