import React from 'react';
import { StyledSVGIconBtn, IStyledSVGIconBtn } from './StyledSVGIconBtn';

interface IProps extends IStyledSVGIconBtn {
    src: React.ReactNode;
    onClick?: (...args: any) => void;
}

const SVGIconBtn = ({ src, size, color, hoverColor, onClick, ...rest }: IProps) => {
    return (
        <StyledSVGIconBtn 
            size={size}
            color={color}
            hoverColor={hoverColor}
            onClick={onClick}
            { ...rest }
        >
            {src}
        </StyledSVGIconBtn>
    );
};

export default SVGIconBtn;