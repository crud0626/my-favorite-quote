import React from 'react';
import { NavButton } from '~/components/Header/NavButton/NavButton';
import SVGIconBtn from '~/components/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { MainLogo, StyledHeader } from './StyledHeader';
import { LoginIcon, LogoutIcon } from '~/assets';

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
            <SVGIconBtn
                src={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                size={sizes.SMALL_ICON_SIZE}
                color={colors.MAIN_WHITE}
                hoverColor={colors.ICON_HOVER_COLOR}
                onClick={() => onClick()}
            />
        </StyledHeader>
    );
}

export default Header;
