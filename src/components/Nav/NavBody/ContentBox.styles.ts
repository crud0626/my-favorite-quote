import styled from 'styled-components';
import { colors, sizes } from '~/styles/common';
import { flexAligns, navContentBox } from '~/styles/mixins';

export const ContentBoxWrapper = styled.li`
    ${navContentBox}
    ${flexAligns('space-between')}

    &:first-of-type {
        border-top: 1px solid ${colors.LIGHT_GRAY};
    }

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

    & > .btn_wrapper {
        margin-left: ${sizes.SPACE_2X};
        flex-shrink: 0;
    }
`;
