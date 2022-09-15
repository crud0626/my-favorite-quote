import React, { forwardRef } from 'react';
import { CardPositionType, QuoteData, QuoteStateType } from '~/types/interface';
import styled from 'styled-components';
import Card from '~/components/Main/Section/CardWrapper/Card';

interface IProps {
    exposedCard: CardPositionType;
    quoteData: QuoteStateType;
    onDownload(): void;
    onChangeFavorite(target: QuoteData): void;
}

const StyledCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

const CardWrapper = forwardRef<HTMLDivElement | null, IProps>(({ exposedCard, quoteData, onDownload, onChangeFavorite }, ref) => {
    return (
        <StyledCardWrapper ref={ref}>
            <Card 
                position={"front"} 
                exposedCard={exposedCard}
                quoteData={quoteData.front}
                onDownload={onDownload}
                onChangeFavorite={onChangeFavorite}
            />
            <Card 
                position={"back"} 
                exposedCard={exposedCard}
                quoteData={quoteData.back}
                onDownload={onDownload}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledCardWrapper>
    );
});

export default CardWrapper;