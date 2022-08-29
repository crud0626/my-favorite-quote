import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const StyledCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const CardWrapper = () => {
    return (
        <StyledCardWrapper>
            <Card />
        </StyledCardWrapper>
    );
};

export default CardWrapper;