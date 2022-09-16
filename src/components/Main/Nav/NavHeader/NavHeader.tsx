import React from "react";
import UserThumbnail from "~/components/UserThumbnail/UserThumbnail";
import LoginButton from "~/components/Main/Nav/NavHeader/LoginButton";
import Icon from "~/components/Icon/Icon";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { StyledButton } from "~/styles/common/StyledButton";
import { LOGOUT_ICON } from "~/styles/common/iconPath";
import { StyledNavHeader } from "~/styles/Nav/NavHeader/StyledNavHeader";
import { IUserInfo } from "~/services/authService";

interface IProps {
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
}

export const NavHeader = ({ userInfo, isLoggedIn, handleLoginBox, onLogout }: IProps) => {
    const { displayName, photoURL } = userInfo;

    const loggedInElements =
        <>
            <div>
                <UserThumbnail userPhotoSrc={photoURL} size={sizes.LARGE_ICON_SIZE} />
                <span>{isLoggedIn && displayName}</span>
            </div>
            <StyledButton onClick={onLogout}>
                <Icon 
                    define={LOGOUT_ICON}
                    color={colors.MAIN_BLACK}
                />
            </StyledButton>
        </>
    ;

    return (
        <StyledNavHeader>
            {
                isLoggedIn 
                ? loggedInElements
                : <LoginButton handleLoginBox={handleLoginBox} />
            }
        </StyledNavHeader>
    );
}