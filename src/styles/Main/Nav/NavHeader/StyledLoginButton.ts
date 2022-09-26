import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledButton } from "~/styles/common/StyledButton";

export const StyledLoginButton = styled(StyledButton)`
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 60%;
    padding: 5px 10px;
    border-radius: ${sizes.SMALL_BORDER_RADIUS};
    border: 1px solid ${colors.LINK_BLUE};
    color: ${colors.LINK_BLUE};

    & > span {
        margin-right: ${sizes.SPACE_2X};
    }

    & > .login_icon_wrapper {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;