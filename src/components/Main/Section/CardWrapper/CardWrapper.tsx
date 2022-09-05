import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { CardPositionType, QuoteStateType } from '../../../../App';

interface IProps {
    exposedCard: CardPositionType;
    onDownload(): void;
    quoteData: QuoteStateType;
}

const StyledCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

const CardWrapper = forwardRef<HTMLDivElement | null, IProps>(({ exposedCard, quoteData, onDownload }, ref) => {
    return (
        <StyledCardWrapper ref={ref}>
            <Card 
                position={"front"} 
                exposedCard={exposedCard}
                quoteData={quoteData.front}
                onDownload={onDownload}
            />
            <Card 
                position={"back"} 
                exposedCard={exposedCard}
                quoteData={quoteData.back}
                onDownload={onDownload}
            />
        </StyledCardWrapper>
    );
});

export default CardWrapper;