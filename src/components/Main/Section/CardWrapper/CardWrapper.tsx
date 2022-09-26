import React, { forwardRef } from 'react';
import { IQuoteData, IQuotesState } from '~/types/interface';
import { CardPositionType } from '~/types/type';
import Card from '~/components/Main/Section/CardWrapper/Card';
import { StyledCardWrapper } from '~/styles/Main/Section/CardWrapper/StyledCardWrapper';

interface IProps {
    cardPosition: CardPositionType;
    displayQuotes: IQuotesState;
    onDownload(): void;
    onChangeFavorite(target: IQuoteData): void;
}

const CardWrapper = forwardRef<HTMLDivElement | null, IProps>(({ cardPosition, displayQuotes, onDownload, onChangeFavorite }, ref) => {
    return (
        <StyledCardWrapper ref={ref}>
            <Card 
                position={"front"} 
                cardPosition={cardPosition}
                quoteContent={displayQuotes.front}
                onDownload={onDownload}
                onChangeFavorite={onChangeFavorite}
            />
            <Card 
                position={"back"} 
                cardPosition={cardPosition}
                quoteContent={displayQuotes.back}
                onDownload={onDownload}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledCardWrapper>
    );
});

export default CardWrapper;