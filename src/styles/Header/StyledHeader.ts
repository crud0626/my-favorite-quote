import styled from 'styled-components';
import { StyledButton } from '~/styles/common/StyledButton';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${sizes.SPACE_7X};
    width: 100%;
    height: ${sizes.HEADER_HEIGHT};
    background-color: ${colors.SUB_BLACK};

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SPACE_2X}
    }
`;

export const MainLogo = styled(StyledButton).attrs(() => ({href: '/'}))`
    color: ${colors.MAIN_WHITE};
    text-decoration: none;

    & h1 {
        font-weight: 100;
        font-size: ${sizes.HEAD_FONT_SIZE};
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        & h1 {
            font-size: ${sizes.MOBILE_HEAD_FONT_SIZE}
        }
    }
`;