import React from 'react';
import { useCardStore, useModalStore, useQuotesStore, useUserStore } from '~/hooks/stores';
import { SVGIconBtn } from '../common';
import { colors, sizes } from '~/styles/common';
import { MainLogo, NavBtnWrapper, StyledHeader } from './Header.styles';
import { LoginIcon, LogoutIcon } from '~/assets/icons';

const lineLen = new Array(3).fill("");

const NavButton = () => {
    const { isOpenNav, toggleNav } = useModalStore();

    return (
        <div>
            <NavBtnWrapper 
                isOpen={isOpenNav}
                aria-label={`${isOpenNav ? 'close' : 'open'} navigation`} 
                onClick={toggleNav}
            >
                {lineLen.map((_, i) => <span key={i} className='line'></span>)}
            </NavBtnWrapper>
        </div>
    );
}

const Header = () => {
    const { isLoggedIn, onLogout } = useUserStore();
    const { replaceQuotes } = useQuotesStore();
    const { toggleLoginModal } = useModalStore();
    const { replaceDisplayQuotes } = useCardStore();

    const onClick = () => {
        if (!isLoggedIn) {
            toggleLoginModal();
            return;
        }
        
        onLogout()
        .then(result => {
            if (result) {
                replaceQuotes();
                replaceDisplayQuotes();
            }
        });
    }

    return (
        <StyledHeader>
            <NavButton />
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
                aria-label={isLoggedIn ? "logout" : "login"}
            />
        </StyledHeader>
    );
}

export default Header;
