import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Card from './Card';

const StyledCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

const CardWrapper = forwardRef<HTMLDivElement | null>((props, ref) => {
    return (
        <StyledCardWrapper ref={ref}>
            <Card position={"front"} />
            <Card position={"back"} />
        </StyledCardWrapper>
    );
});

export default CardWrapper;