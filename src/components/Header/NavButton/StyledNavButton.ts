import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledButton } from "~/styles/common/StyledButton";

interface ILineProp {
    isOpen: boolean;
}

export const StyledNavButton = styled(StyledButton)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover > span {
        background-color: ${colors.ICON_HOVER_COLOR};
    }
`;

export const HamburgerLine = styled.span<ILineProp>`
    display: block;
    margin: 0 auto;
    width: ${sizes.SMALL_ICON_SIZE};
    height: 3px;
    border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
    background-color: ${colors.MAIN_WHITE};
    transition: transform 0.3s ease-in-out;

    &:nth-child(1) {
        transform: ${props => props.isOpen && 
            "translateY(8px) rotate(45deg);"
        }
    }

    &:nth-child(2) {
        margin: 5px auto;
        opacity: ${props => props.isOpen && "0"};
    }

    &:nth-child(3) {
        transform: ${props => props.isOpen && 
            "translateY(-8px) rotate(-45deg);"
        }
    }
`;