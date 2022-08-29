import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../../styles/common/sizes';
import ChevronWrapper from '../ChevronWrapper';
import CardWrapper from './CardWrapper/CardWrapper';

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
    return (
        <StyledSection>
            <div className='card_section'>
                <CardWrapper />
                <ChevronWrapper />
            </div>
        </StyledSection>
    );
};

export default Section;