import React from "react";
import UserAvatar from "~/components/common/UserAvatar/UserAvatar";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { PrimaryButton } from "~/styles/common/PrimaryButton";
import { StyledLoginButton, StyledNavHeader } from "./NavHeader.styles";
import { IUserInfo } from "~/types/user.type";
import { LoginIcon, LogoutIcon } from "~/assets";

interface IProps {
    userInfo: IUserInfo | null;
    isLoggedIn: boolean;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
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

const UserInfo = ({ userInfo, isLoggedIn, onLogout }: Omit<IProps, 'handleLoginBox'>) => {
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

const NavHeader = ({ userInfo, isLoggedIn, handleLoginBox, onLogout }: IProps) => {
    return (
        <StyledNavHeader>
            {
                isLoggedIn && userInfo
                ? <UserInfo { ...{userInfo, isLoggedIn, onLogout}} />
                : <LoginButton handleLoginBox={handleLoginBox} />
            }
        </StyledNavHeader>
    );
}

export default NavHeader;