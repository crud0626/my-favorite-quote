import styled from "styled-components";
import * as colors from './common/colors';
import * as sizes from './common/sizes';

interface IProps {
    isOpen: boolean;
}

export const Line = styled.span<IProps>`
    display: block;
    margin: 0 auto;
    width: ${sizes.SMALL_ICON_SIZE};
    height: 3px;
    border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
    background-color: ${colors.MAIN_WHITE};
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

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