import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';

export const StyledFooter = styled.footer`
    padding: 0 ${sizes.SPACE_7X};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${sizes.FOOTER_HEIGHT};
    background-color: ${colors.SUB_BLACK};

    & .copyright > span {
        font-size: ${sizes.SUB_FONT_SIZE};
    }

    & .github {
        width: ${sizes.DEFAULT_ICON_SIZE};
        height: ${sizes.DEFAULT_ICON_SIZE};
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SPACE_2X};
    }

    @media screen and (max-width: 425px) {
        & .copyright > span {
            white-space: pre-line;
        }
    }
`;