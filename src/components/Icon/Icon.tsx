import React from 'react';
import styled from 'styled-components';
import * as colors from '~/styles/common/colors';

interface StyledProps {
    color: string;
    isHoverColor?: boolean;
}

interface RenderProps extends StyledProps {
    define: string;
}

const StyledIcon = styled("svg").attrs(() => ({
    viewBox: '0 0 400 400'
}))<StyledProps>`
    width: 100%;
    height: 100%;
    fill: ${props => props.color};

    &:hover {
        ${props => 
            props.isHoverColor && `fill: ${colors.ICON_HOVER_COLOR}`
        }
    }
`;

const Icon = ({ define, color, isHoverColor }: RenderProps) => {
    return (
        <StyledIcon color={color} isHoverColor={isHoverColor}>
            <g>
                <path d={define} />
            </g>
        </StyledIcon>
    );
};

export default Icon;