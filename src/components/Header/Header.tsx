import React from 'react';
import SVGIconBtn from '~/components/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { MainLogo, NavBtnWrapper, StyledHeader } from './Header.styles';
import { LoginIcon, LogoutIcon } from '~/assets';

interface IProps {
    isNavOpen: boolean;
    isLoggedIn: boolean;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
}

const NavButton = ({ isNavOpen, handleNav }: Pick<IProps, 'isNavOpen' | 'handleNav'>) => {
    const lineLen = new Array(3).fill("");

    return (
        <div>
            <NavBtnWrapper isOpen={isNavOpen} onClick={handleNav}>
                {lineLen.map((_, i) => <span key={i} className='line'></span>)}
            </NavBtnWrapper>
        </div>
    );
}

const Header = ({ isNavOpen, isLoggedIn, handleNav, handleLoginBox, onLogout }: IProps) => {
    const onClick = () => {
        isLoggedIn ? onLogout() : handleLoginBox();
    }

    return (
        <StyledHeader>
            <NavButton
                isNavOpen={isNavOpen} 
                handleNav={handleNav}
            />
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
