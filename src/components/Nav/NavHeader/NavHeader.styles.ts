import styled from "styled-components";
import { StyledNavBox } from "~/components/Nav/Nav.styles";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { StyledButton } from '~/styles/common/StyledButton';

export const StyledNavHeader = styled(StyledNavBox)`
    & > :first-child > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

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

    & > .icon_wrapper {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;