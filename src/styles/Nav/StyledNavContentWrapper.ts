import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledButton } from "~/styles/common/StyledButton";
import { NavBoxWrapper } from "~/styles/Nav/NavBoxWrapper";

interface NavButtonProps {
    isOpen: boolean;
}

export const StyledNavContentWrapper = styled.div`
    min-height: 70px;
    height: auto;
    border-top: 1px solid ${colors.LIGHT_GRAY};

    &:last-child {
        border-bottom: 1px solid ${colors.LIGHT_GRAY};
    }

    & > :nth-child(2) {
        border-top: 1px solid ${colors.LIGHT_GRAY};
    }
`;

export const ContentController = styled(NavBoxWrapper)`
    justify-content: flex-start;
    cursor: pointer;

    & > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

export const NavBodyButton = styled(StyledButton)<NavButtonProps>`
    transition: all 0.3s ease-in-out;
    transform: ${props => props.isOpen ? "rotate(-180deg)" : "rotate(0deg)" };
    transform-origin: center;
`;