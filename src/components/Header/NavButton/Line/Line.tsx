import styled from "styled-components";
import * as colors from '../../../../styles/common/colors';

interface IProps {
    isOpen: boolean;
}

export const Line = styled.span<IProps>`
    display: block;
    margin: auto;
    width: 24px;
    height: 3px;
    border-radius: 5px;
    background-color: ${colors.MAIN_WHITE};
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    &:nth-child(1) {
        transform: ${props => props.isOpen && 
            "translateY(9px) rotate(45deg);"
        }
    }

    &:nth-child(2) {
        margin: 5px auto;
        opacity: ${props => props.isOpen && "0"};
    }

    &:nth-child(3) {
        transform: ${props => props.isOpen && 
            "translateY(-9px) rotate(-45deg);"
        }
    }
`;