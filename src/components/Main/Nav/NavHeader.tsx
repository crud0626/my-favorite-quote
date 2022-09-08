import React from "react";
import styled from "styled-components";
import UserThumbnail from "../../UserThumbnail/UserThumbnail";
import LoginButton from "./LoginButton";
import Icon from "../../Icon/Icon";
import { IUserInfo } from "../../../services/authService";
import * as sizes from '../../../styles/common/sizes';
import * as colors from '../../../styles/common/colors';
import { StyledButton } from "../../../styles/StyledButton";
import { NavBoxWrapper } from "../../../styles/NavBoxWrapper";
import { LOGOUT_ICON } from "../../../styles/common/iconPath";

interface IProps {
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
}

const StyledNavHeader = styled(NavBoxWrapper)`
    & > :first-child > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

export const NavHeader = ({ userInfo, isLoggedIn, handleLoginBox, onLogout  }: IProps) => {
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