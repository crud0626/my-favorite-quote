import styled from "styled-components";
import * as colors from '../common/colors';
import * as sizes from '../common/sizes';

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
`;