import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';
import Nav from './Nav/Nav';
import Section from './Section/Section';

interface IProps {
    isNavOpen: boolean;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen }: IProps) => {
    return(
        <StyledMain>
            <Section />
            <Nav isNavOpen={isNavOpen} />
        </StyledMain>
    );
}

export default Main;