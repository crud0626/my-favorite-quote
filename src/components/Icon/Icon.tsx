import React from 'react';
import { IStyledIcon, StyledIcon } from '~/styles/Icon/StyledIcon';

interface IProps extends IStyledIcon {
    define: string;
}

const Icon = ({ define, color, isHoverColor }: IProps) => {
    return (
        <StyledIcon color={color} isHoverColor={isHoverColor}>
            <g>
                <path d={define} />
            </g>
        </StyledIcon>
    );
};

export default Icon;