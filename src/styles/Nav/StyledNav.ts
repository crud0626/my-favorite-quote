import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { navBoxMixin } from "~/styles/mixins/navBoxMixin";

export interface StyledNavProps {
    isNavOpen: boolean;
}

export const StyledNav = styled.nav<StyledNavProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${colors.CONTAINER_ALPHA};
    visibility: ${props => props.isNavOpen ? "visible" : "hidden"};
    z-index: 5;

    & > div {
        width: ${sizes.DEFAULT_NAV_SIZE};
        height: 100%;
        background-color: ${colors.MAIN_WHITE};
        transition: all 0.2s ease-in-out;
        transform: ${props => props.isNavOpen ? "translateX(0)" : "translateX(-101%)"};
        overflow-y: auto;
        color: ${colors.MAIN_BLACK};
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        & > div {
            width: 100%;
        }
    }
`;

export const NavBody = styled.div`
    width: 100%;
`;

export const StyledNavBox = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & :first-child {
        display: flex;
        align-items: center;
    }
`;