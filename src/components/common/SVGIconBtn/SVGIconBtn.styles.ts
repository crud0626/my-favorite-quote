import styled, { css } from 'styled-components';

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
    width: ${({ size }) => size};
    height: ${({ size }) => size};

    & > svg {
        fill: ${({ color }) => color};
    }
    
    ${({ hoverColor }) => hoverColor && css`
        &:hover > svg {
            fill: ${hoverColor}
        }
    `}

    ${({ position, top, right }: IStyledSVGIconBtn) => {
        return css`
        ${position && `position: ${position};`}
        ${top && `top: ${top};`}
        ${right && `right: ${right};`}
    `}}
`;