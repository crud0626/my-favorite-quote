import React, { MutableRefObject } from 'react';
import Nav from '~/components/Nav/Nav';
import Card from './Card/Card';
import ChevronBox from './ChevronBox/ChevronBox';
import { CardWrapper, StyledMain } from './Main.styles';
import { downloadToImg } from '~/services/html2canvas';
import { CardPositionType, ChevronEventType } from '~/types/user.type';
import { IQuoteContent } from '~/types/quote.type';
import { IAuthService } from '~/types/auth.type';

interface IProps {
    cardWrapperRef: MutableRefObject<HTMLDivElement | null>;
    isNavOpen: boolean;
    authService: IAuthService;
    requestData(id?: string): Promise<any>;
    handleNav(): void;
    handleLoginBox(): void;
    onChangeFavorite(target: IQuoteContent): void;
    onClickNavContent(target: IQuoteContent): void;
}

const cardPositions: CardPositionType[] = ['front', 'back'];

const Main = ({ cardWrapperRef, isNavOpen, authService, requestData, handleNav, handleLoginBox, onChangeFavorite, onClickNavContent }: IProps) => {

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
                authService={authService} 
                onClickNavContent={onClickNavContent}
                handleNav={handleNav}
                handleLoginBox={handleLoginBox}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledMain>
    );
}

export default Main;