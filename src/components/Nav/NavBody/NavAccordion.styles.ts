import styled from "styled-components";
import { StyledNavBox } from "../Nav.styles";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { PrimaryButton } from "~/styles/common/PrimaryButton";
import { navContentBox } from "~/styles/mixins/navContentBox";
import { flexAligns } from "~/styles/mixins/flexAligns";

interface IProps {
    isOpen: boolean;
}

export const TextBox = styled.li`
    ${navContentBox}
    ${flexAligns('flex-start')}
    border-top: 1px solid ${colors.LIGHT_GRAY};
    cursor: unset;
`;

export const AccordionTitle = styled(StyledNavBox)`
    justify-content: flex-start;
    min-height: 70px;
    height: auto;
    border-top: 1px solid ${colors.LIGHT_GRAY};
    
    &:hover {
        background-color: ${colors.BUTTON_HOVER};
    }

    & > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

export const NavBodyButton = styled(PrimaryButton)<IProps>`
    transition: all 0.3s ease-in-out;
    transform: ${({ isOpen }) => isOpen ? "rotate(-180deg)" : "rotate(0deg)" };
    transform-origin: center;
`;