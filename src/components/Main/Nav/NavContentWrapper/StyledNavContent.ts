import styled from "styled-components";
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { navBoxMixin } from "~/styles/mixins/navBoxMixin";
import { StyledButton } from "~/styles/common/StyledButton";

export const StyledNavContent = styled.li`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BUTTON_HOVER};
    }

    &:active {
        background-color: ${colors.BUTTON_ACTIVE};
    }

    & > .text_wrapper {
        & > span {
        display: block;

        &:first-child {
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        &:last-child {
            font-size: ${sizes.SUB_FONT_SIZE};

            &::before {
                content: "- ";
            }
        }
    }
    }
`;

export const NavFavoriteButton = styled(StyledButton)`
    margin-left: ${sizes.SPACE_2X};
    flex-shrink: 0;
`;
