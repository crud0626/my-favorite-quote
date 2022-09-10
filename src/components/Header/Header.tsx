import React from 'react';
import Icon from '../Icon/Icon';
import { NavButton } from './NavButton/NavButton';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { StyledButton } from '../../styles/StyledButton';
import { LOGIN_ICON, LOGOUT_ICON } from '../../styles/common/iconPath';
import { MainLogo, StyledHeader } from '../../styles/StyledHeader';

interface IProps {
    isNavOpen: boolean;
    isLoggedIn: boolean;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
}

const Header = ({ isNavOpen, isLoggedIn, handleNav, handleLoginBox, onLogout }: IProps) => {
    const onClick = () => {
        isLoggedIn ? onLogout() : handleLoginBox();
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
                <MainLogo as="a">
                    <h1>myFavoriteQuotes</h1>
                </MainLogo>
            </div>
            <StyledButton 
                size={sizes.SMALL_ICON_SIZE}
                onClick={onClick}
            >
                <Icon 
                    define={isLoggedIn ? LOGOUT_ICON : LOGIN_ICON}
                    color={colors.MAIN_WHITE}
                    isHoverColor={true}
                />
            </StyledButton>
        </StyledHeader>
    );
}

export default Header;
