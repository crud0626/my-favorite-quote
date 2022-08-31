import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../styles/common/colors';
import * as sizes from '../../../styles/common/sizes';
import { NavHeader } from './NavHeader';
import { NavBody } from './NavBody';
import { QuoteData } from '../../../services/quotesApi';

interface StyledProps {
    isNavOpen: boolean;
}
interface RenderProps extends StyledProps {
    quoteHistory: QuoteData[];
}

const NavContainer = styled.div<StyledProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${colors.CONTAINER_ALPHA};
    visibility: ${props => props.isNavOpen ? "visible" : "hidden"};
    z-index: 5;
`;

const StyledNav = styled.nav<StyledProps>`
    width: ${sizes.DEFAULT_NAV_SIZE};
    height: 100%;
    background-color: ${colors.MAIN_WHITE};
    transition: all 0.2s ease-in-out;
    transform: ${props => props.isNavOpen ? "translateX(0)" : "translateX(-101%)"};
    overflow-y: auto;
    color: ${colors.MAIN_BLACK};
`;

const Nav = ({ isNavOpen, quoteHistory }: RenderProps) => {
    return (
        <NavContainer isNavOpen={isNavOpen}>
            <StyledNav isNavOpen={isNavOpen}>
                <NavHeader />
                <NavBody quoteHistory={quoteHistory} />
            </StyledNav>
        </NavContainer>
    );
};

export default Nav;