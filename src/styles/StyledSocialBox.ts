import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import * as sizes from './common/sizes';
import * as colors from './common/colors';

export const StyledSocialBox = styled(StyledButton)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${sizes.SOCIAL_LOGIN_COTENT_WIDTH};
    height: ${sizes.SOCIAL_LOGIN_COTENT_HEIGHT};
    margin-top: ${sizes.SPACE_4X};
    padding: 0 ${sizes.SPACE_7X};
    border: 1px solid ${colors.MAIN_WHITE};
    border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
    color: ${colors.MAIN_WHITE};

    &:hover {
        background: ${colors.MAIN_WHITE};
        color: ${colors.MAIN_BLACK};
    }

    & > img {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;