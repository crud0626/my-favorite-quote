import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../../styles/common/sizes';

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

const Section = () => {
    return (
        <StyledSection />
    );
};

export default Section;