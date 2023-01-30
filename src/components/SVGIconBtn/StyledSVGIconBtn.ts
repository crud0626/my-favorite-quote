import styled, { css } from "styled-components";

export interface IStyledSVGIconBtn {
    color: string;
    size: string;
    hoverColor?: string;

    // 확장성 고려하기
    position?: string;
    top?: string;
    right?: string;
}

export const StyledSVGIconBtn = styled('button')<IStyledSVGIconBtn>` 
    ${({ size }) => css`
        width: ${size};
        height: ${size};
    `}
    background: transparent;
    cursor: pointer;

    & > svg {
        fill: ${({ color }) => color}
    }

    &:hover > svg {
        ${({ hoverColor }) => hoverColor && `fill: ${hoverColor}`}
    }

    ${({ position, top, right }: IStyledSVGIconBtn) => {
        return css`
        ${position && `position: ${position};`}
        ${top && `top: ${top};`}
        ${right && `right: ${right};`}
    `}}
`;