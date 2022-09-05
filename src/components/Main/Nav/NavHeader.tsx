import React from "react";
import styled from "styled-components";
import UserThumbnail from "../../UserThumbnail/UserThumbnail";
import Icon from "../../Icon/Icon";
import * as sizes from '../../../styles/common/sizes';
import * as colors from '../../../styles/common/colors';
import { StyledButton } from "../../../styles/StyledButton";
import { NavBoxWrapper } from "../../../styles/NavBoxWrapper";
import { LOGOUT_ICON } from "../../../styles/common/iconPath";

const StyledNavHeader = styled(NavBoxWrapper)`
    & > :first-child > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

export const NavHeader = () => {
    return (
        <StyledNavHeader>
            <div>
                <UserThumbnail size={sizes.LARGE_ICON_SIZE} />
                <span>Nickname</span>
            </div>
            <StyledButton>
                <Icon 
                    define={LOGOUT_ICON}
                    color={colors.MAIN_BLACK}
                />
            </StyledButton>
        </StyledNavHeader>
    );
}