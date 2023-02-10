import React from 'react';
import SVGIconBtn from '~/components/common/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { MainLogo, NavBtnWrapper, StyledHeader } from './Header.styles';
import { useUserStore } from '~/stores/useUserStore';
import { useNavStore } from '~/stores/useNavStore';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useLoginBoxStore } from '~/stores/useLoginBoxStore';
import { LoginIcon, LogoutIcon } from '~/assets';
import { useCardStore } from '~/stores/useCardStore';

const lineLen = new Array(3).fill("");

const NavButton = () => {
    const { isOpenNav, handleNav } = useNavStore();

    return (
        <div>
            <NavBtnWrapper isOpen={isOpenNav} onClick={handleNav}>
                {lineLen.map((_, i) => <span key={i} className='line'></span>)}
            </NavBtnWrapper>
        </div>
    );
}

const Header = () => {
    const { isLoggedIn, onLogout } = useUserStore();
    const { clearUserQuotes } = useQuotesStore();
    const { handleLoginBox } = useLoginBoxStore();
    const { replaceDisplayQuotes } = useCardStore();

    const onClick = () => {
        if (!isLoggedIn) {
            handleLoginBox();
            return;
        }
        
        onLogout()
        .then(result => {
            if (result) {
                clearUserQuotes();
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
            />
        </StyledHeader>
    );
}

export default Header;
