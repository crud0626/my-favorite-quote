import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../styles/common/colors';
import { NavHeader } from './NavHeader';
import { NavBody } from './NavBody';

interface IProps {
    isNavOpen: boolean;
}

const NavContainer = styled.div<IProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${colors.CONTAINER_ALPHA};
    visibility: ${props => props.isNavOpen ? "visible" : "hidden"};
    z-index: 5;
`;

const StyledNav = styled.nav<IProps>`
    width: 350px;
    height: 100%;
    background-color: ${colors.MAIN_WHITE};
    transition: all 0.2s ease-in-out;
    transform: ${props => props.isNavOpen ? "translateX(0)" : "translateX(-101%)"};
    overflow-y: auto;
    color: ${colors.MAIN_BLACK};
`;

const Nav = ({ isNavOpen }: IProps) => {
    return (
        <NavContainer isNavOpen={isNavOpen}>
            <StyledNav isNavOpen={isNavOpen}>
                <NavHeader />
                <NavBody />
            </StyledNav>
        </NavContainer>
    );
};

export default Nav;