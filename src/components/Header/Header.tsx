import React from 'react';
import SVGIconBtn from '~/components/common/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { MainLogo, NavBtnWrapper, StyledHeader } from './Header.styles';
import { LoginIcon, LogoutIcon } from '~/assets';
import { useUserStore } from '~/stores/useUserStore';
import { IAuthService } from '~/types/auth.type';
import { useNavStore } from '~/stores/useNavStore';
import { useLoginBoxStore } from '~/stores/useLoginBoxStore';

interface IProps {
    authService: IAuthService;
}

const NavButton = () => {
    const { isOpenNav, handleNav } = useNavStore();
    const lineLen = new Array(3).fill("");

    return (
        <div>
            <NavBtnWrapper isOpen={isOpenNav} onClick={handleNav}>
                {lineLen.map((_, i) => <span key={i} className='line'></span>)}
            </NavBtnWrapper>
        </div>
    );
}

const Header = ({ authService }: IProps) => {
    const { isLoggedIn, updateUserInfo, clearUserQuotes } = useUserStore();
    const { handleLoginBox } = useLoginBoxStore();

    const onLogout = async (): Promise<void> => {
        const status = await authService.requestLogout();

        if(status) {
            updateUserInfo();
            clearUserQuotes();
            window.alert("로그아웃 되었습니다.");
            return;
        }

        alert("로그아웃 도중 에러가 발생했습니다.");
    }

    const onClick = () => {
        isLoggedIn ? onLogout() : handleLoginBox();
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
