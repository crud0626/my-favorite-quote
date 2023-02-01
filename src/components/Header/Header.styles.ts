import styled, { css } from 'styled-components';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { PrimaryButton } from '~/styles/common/PrimaryButton';
import { flexAligns } from '~/styles/mixins/flexAligns';

interface IProps {
    isOpen: boolean;
}

export const NavBtnWrapper = styled(PrimaryButton)<IProps>`
    ${flexAligns('center')}
    flex-direction: column;

    /* lines */
    & > .line {
        display: block;
        margin: 0 auto;
        width: ${sizes.SMALL_ICON_SIZE};
        height: 3px;
        border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
        background-color: ${colors.MAIN_WHITE};
        transition: transform 0.3s ease-in-out;

        &:nth-child(2) {
            margin: 5px auto;
        }

        ${({ isOpen }) => 
            isOpen && 
            css`
            &:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            &:nth-child(2) {
                opacity: 0;
            }

            &:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        `}
    }

    &:hover > .line {
        background-color: ${colors.ICON_HOVER_COLOR};
    }
`;

export const MainLogo = styled(PrimaryButton).attrs(() => ({
    href: '/'
}))`
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

export const StyledHeader = styled.header`
    ${flexAligns('space-between')}
    padding: 0 ${sizes.SPACE_7X};
    width: 100%;
    height: ${sizes.HEADER_HEIGHT};
    background: ${colors.SUB_BLACK};

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SPACE_2X}
    }
`;