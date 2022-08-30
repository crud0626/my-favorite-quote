import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import * as sizes from '../../../styles/common/sizes';
import { rotateRegex } from '../../../utils/regexPatterns';
import ChevronWrapper from '../ChevronWrapper';
import CardWrapper from './CardWrapper/CardWrapper';

export type ChevronEventTypes = "prev" | "next";

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;

    & .card_section {
        position: relative;
        height: ${sizes.CARD_HEIGHT};
        aspect-ratio: ${sizes.CARD_ASPECT_RATIO};
    }
`;

const Section = () => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleCardFilp = useCallback((direction: ChevronEventTypes): void => {
        if(cardWrapperRef.current) {
            const matched = cardWrapperRef.current.style.transform.match(rotateRegex);
            const prevValue = matched ? +matched[0] : 0;
            const newValue = direction === "prev" ? prevValue - 0.5 : prevValue + 0.5;

            cardWrapperRef.current.style.transform = `rotateY(${newValue}turn)`;
        }
    }, []);

    return (
        <StyledSection>
            <div className='card_section'>
                <CardWrapper ref={cardWrapperRef} />
                <ChevronWrapper handleCardFilp={handleCardFilp} />
            </div>
        </StyledSection>
    );
};

export default Section;