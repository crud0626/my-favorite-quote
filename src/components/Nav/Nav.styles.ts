import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { flexAligns } from "~/styles/mixins/flexAligns";
import { navContentBox } from "~/styles/mixins/navContentBox";

export interface StyledNavProps {
    isOpenNav: boolean;
}

export const StyledNav = styled.nav<StyledNavProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${colors.CONTAINER_ALPHA};
    visibility: ${props => props.isOpenNav ? "visible" : "hidden"};
    user-select: none;
    z-index: 5;

    & > div {
        width: ${sizes.DEFAULT_NAV_SIZE};
        height: 100%;
        background-color: ${colors.MAIN_WHITE};
        transition: all 0.2s ease-in-out;
        transform: ${props => props.isOpenNav ? "translateX(0)" : "translateX(-101%)"};
        overflow-y: auto;
        color: ${colors.MAIN_BLACK};
    }

    & > .nav_body {
        width: 100%;
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        & > div {
            width: 100%;
        }
    }
`;

export const StyledNavBox = styled.div`
    ${navContentBox}
    ${flexAligns('space-between', 'center')}
    width: 100%;

    & :first-child {
        ${flexAligns()}
    }
`;