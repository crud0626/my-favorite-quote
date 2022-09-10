import styled from "styled-components";
import * as sizes from './common/sizes';
import * as colors from './common/colors';
import { ChevronEventTypes } from '../components/Main/Section/Section';
import { StyledButton } from "./StyledButton";

interface StyledChevronButtonProps {
    direction: ChevronEventTypes;
}

export const StyledChevronWrapper = styled.div`
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 0px;
    background-color: transparent;
`;

export const ChevronButton = styled(StyledButton)<StyledChevronButtonProps>`
    padding: ${sizes.SPACE_2X};
    width: ${sizes.CHEVRON_CONTAINER_SIZE};
    height: ${sizes.CHEVRON_CONTAINER_SIZE};
    border-radius: ${sizes.SMALL_BORDER_RADIUS};
    transform: translateX(${props => props.direction === "prev" ? "-200%" : "200%" });

    &:hover {
        background-color: ${colors.CHEVRON_BG_HOVER};
    }

    &:active {
        background-color: ${colors.CHEVRON_BG_ACTIVE};
    }
`;