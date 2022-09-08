import React from 'react';
import styled from 'styled-components';
import { NavHeader } from './NavHeader';
import { NavBody } from './NavBody';
import { QuoteData } from '../../../App';
import { IUserInfo } from '../../../services/authService';
import * as colors from '../../../styles/common/colors';
import * as sizes from '../../../styles/common/sizes';

interface StyledProps {
    isNavOpen: boolean;
}

interface RenderProps extends StyledProps {
    quoteHistory: QuoteData[];
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    favoriteQuotes: QuoteData[];
    onClickNavContent(target: QuoteData): void;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
    onChangeFavorite(target: QuoteData): void;
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

const Nav = ({ isNavOpen, quoteHistory, userInfo, isLoggedIn, favoriteQuotes, onClickNavContent, handleNav, handleLoginBox, onLogout, onChangeFavorite }: RenderProps) => {
    const onClick = (event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleNav();
        }
    }

    return (
        <NavContainer isNavOpen={isNavOpen} onClick={onClick}>
            <StyledNav isNavOpen={isNavOpen}>
                <NavHeader 
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    handleLoginBox={handleLoginBox}
                    onLogout={onLogout}
                />
                <NavBody 
                    quoteHistory={quoteHistory} 
                    isLoggedIn={isLoggedIn}
                    favoriteQuotes={favoriteQuotes}
                    onClickNavContent={onClickNavContent}
                    onChangeFavorite={onChangeFavorite}
                />
            </StyledNav>
        </NavContainer>
    );
};

export default Nav;