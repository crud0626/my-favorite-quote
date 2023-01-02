import styled from "styled-components";
import * as colors from '~/styles/common/colors';

export interface IStyledIcon {
    color: string;
    isHoverColor?: boolean;
}

export const StyledIcon = styled("svg").attrs(() => ({
    viewBox: '0 0 400 400'
}))<IStyledIcon>`
    width: 100%;
    height: 100%;
    fill: ${props => props.color};

    &:hover {
        ${props => 
            props.isHoverColor && `fill: ${colors.ICON_HOVER_COLOR}`
        }
    }
`;