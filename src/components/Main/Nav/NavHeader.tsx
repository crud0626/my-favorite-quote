import React from "react";
import * as sizes from '../../../styles/common/sizes';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledButton } from "../../../styles/StyledButton";
import UserThumbnail from "../../UserThumbnail/UserThumbnail";
import { NavBoxWrapper } from "../../../styles/NavBoxWrapper";

export const NavHeader = () => {
    return (
        <NavBoxWrapper>
            <div>
                <UserThumbnail size={sizes.LARGE_ICON_SIZE} />
                <span>Nickname</span>
            </div>
            <StyledButton>
                <FontAwesomeIcon 
                    icon={faArrowRightFromBracket} 
                    style={{ width: "100%", height: "100%", cursor: "pointer" }}
                />
            </StyledButton>
        </NavBoxWrapper>
    );
}