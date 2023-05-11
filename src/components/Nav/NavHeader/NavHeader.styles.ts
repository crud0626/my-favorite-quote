import styled from 'styled-components';
import { StyledNavBox } from '~/components/Nav/Nav.styles';
import { PrimaryButton, colors, sizes } from '~/styles/common';
import { flexAligns } from '~/styles/mixins';

export const StyledNavHeader = styled(StyledNavBox)`
    cursor: unset;
    
    & > :first-child > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

export const LoginButton = styled(PrimaryButton)`
    ${flexAligns()}
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