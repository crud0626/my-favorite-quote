import React from "react";
import UserAvatar from "~/components/common/UserAvatar/UserAvatar";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { PrimaryButton } from "~/styles/common/PrimaryButton";
import { StyledLoginButton, StyledNavHeader } from "./NavHeader.styles";
import { LoginIcon, LogoutIcon } from "~/assets";
import { useUserStore } from "~/stores/useUserStore";
import { IAuthService } from "~/types/auth.type";

interface IProps {
    authService: IAuthService;
    handleLoginBox(): void;
}

const LoginButton = ({ handleLoginBox }: Pick<IProps, 'handleLoginBox'>) => {
    return (
        <StyledLoginButton onClick={handleLoginBox}>
            <span>LOGIN</span>
            <div className='icon_wrapper'>
                <LoginIcon fill={colors.LINK_BLUE} />
            </div>
        </StyledLoginButton>
    );
};

const UserInfo = ({ authService }: Pick<IProps, 'authService'>) => {
    const { isLoggedIn, userInfo, updateUserInfo, clearUserQuotes} = useUserStore();

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

    if (!userInfo) return null;

    const { displayName, photoURL } = userInfo;
    
    return (
        <>
            <div>
                <UserAvatar 
                    userPhotoSrc={photoURL} 
                    size={sizes.LARGE_ICON_SIZE} 
                />
                <span>
                    {isLoggedIn && displayName}
                </span>
            </div>
            <PrimaryButton onClick={onLogout}>
                <LogoutIcon fill={colors.MAIN_BLACK} />
            </PrimaryButton>
        </>
    );
}

const NavHeader = ({ authService, handleLoginBox }: IProps) => {
    const { isLoggedIn } = useUserStore();

    return (
        <StyledNavHeader>
            {
                isLoggedIn
                ? <UserInfo { ...{ authService, isLoggedIn }} />
                : <LoginButton handleLoginBox={handleLoginBox} />
            }
        </StyledNavHeader>
    );
}

export default NavHeader;