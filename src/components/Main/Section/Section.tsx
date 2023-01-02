import React, { MutableRefObject } from 'react';
import { IQuoteData, IQuotesState } from '~/types/interface';
import { CardPositionType } from '~/types/type';
import ChevronWrapper from '~/components/Main/ChevronWrapper';
import CardWrapper from '~/components/Main/Section/CardWrapper/CardWrapper';
import { downloadToImg } from '~/services/html2canvas';
import { StyledSection } from './StyledSection';

interface IProps {
    cardWrapperRef: MutableRefObject<HTMLDivElement | null>;
    displayQuotes: IQuotesState;
    cardPosition: CardPositionType;
    requestData(id?: string): Promise<any>;
    onChangeFavorite(target: IQuoteData): void;
}

const Section = ({ cardWrapperRef, displayQuotes, cardPosition, requestData, onChangeFavorite }: IProps) => {
    const onDownload = (): void => {
        if(cardWrapperRef.current) {
            downloadToImg(cardWrapperRef.current);
        }
    }

    return (
        <StyledSection>
            <div className='card_section'>
                <CardWrapper 
                    ref={cardWrapperRef} 
                    cardPosition={cardPosition}
                    displayQuotes={displayQuotes}
                    onDownload={onDownload}
                    onChangeFavorite={onChangeFavorite}
                />
                <ChevronWrapper requestData={requestData} />
            </div>
        </StyledSection>
    );
};

export default Section;