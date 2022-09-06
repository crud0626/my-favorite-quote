import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { NavButton } from './NavButton/NavButton';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { StyledButton } from '../../styles/StyledButton';
import { LOGIN_ICON, LOGOUT_ICON } from '../../styles/common/iconPath';

interface IProps {
    isNavOpen: boolean;
    userThumbnail: string | null;
    handleNav(): void;
    onLogin(): Promise<void>;
    onLogout(): Promise<void>;
}

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${sizes.SPACE_7X};
    width: 100%;
    height: ${sizes.HEADER_HEIGHT};
    background-color: ${colors.SUB_BLACK};

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SPACE_2X}
    }
`;

const Logo = styled.a.attrs(() => ({href: '/'}))`
    color: ${colors.MAIN_WHITE};
    font-size: ${sizes.HEAD_FONT_SIZE};
    text-decoration: none;

    & h1 {
        font-weight: 100;
    }
`;

const Header = ({ isNavOpen, userThumbnail, handleNav, onLogin, onLogout }: IProps) => {

    const onClick = () => {
        userThumbnail ? onLogout() : onLogin();
    }

    return (
        <StyledHeader>
            <div>
                <NavButton 
                    isNavOpen={isNavOpen} 
                    handleNav={handleNav}
                />
            </div>
            <div>
                <Logo>
                    <h1>myFavoriteQuotes</h1>
                </Logo>
            </div>
            <StyledButton 
                size={sizes.SMALL_ICON_SIZE}
                onClick={onClick}
            >
                <Icon 
                    define={userThumbnail ? LOGOUT_ICON : LOGIN_ICON}
                    color={colors.MAIN_WHITE}
                    isHoverColor={true}
                />
            </StyledButton>
        </StyledHeader>
    );
}

export default Header;
