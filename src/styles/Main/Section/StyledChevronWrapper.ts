import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { ChevronEventType } from "~/types/type";
import { StyledButton } from '~/styles/common/StyledButton';

interface StyledChevronButtonProps {
    direction: ChevronEventType;
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
    transition: opacity 0.3s;
    transform: translateX(${props => props.direction === "prev" ? "-200%" : "200%" });

    &:hover {
        background-color: ${colors.CHEVRON_BG_HOVER};
    }

    &:active {
        background-color: ${colors.CHEVRON_BG_ACTIVE};
    }

    @media screen and (min-width: ${sizes.TABLET_VIEWPORT_SIZE}) and (max-width: ${sizes.LAPTOP_VIEWPORT_SIZE}) {
        transform: translateX(${props => props.direction === "prev" ? "-100%" : "100%" });
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        transform: translateX(0%);
        opacity: 0;

        &:hover {
            opacity: 1;
        }
    }
`;