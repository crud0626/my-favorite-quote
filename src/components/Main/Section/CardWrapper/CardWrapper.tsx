import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { CardPositionTypes } from '../Section';
import { QuoteData } from '../../../../services/quotesApi';

interface IProps {
    exposedCard: CardPositionTypes;
    downloadImage(): void;
    quoteData: QuoteData | null;
}

const StyledCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

const CardWrapper = forwardRef<HTMLDivElement | null, IProps>((props, ref) => {
    return (
        <StyledCardWrapper ref={ref}>
            <Card position={"front"} { ...props } />
            <Card position={"back"} { ...props } />
        </StyledCardWrapper>
    );
});

export default CardWrapper;