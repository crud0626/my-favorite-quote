import styled from 'styled-components';
import * as sizes from '~/styles/common/sizes';
import { CardPositionType } from '~/types/user.type';
import { DEFAULT as DEFAULT_BG } from '~/assets/card_images';
import { flexAligns } from '~/styles/mixins/flexAligns';

export interface StyledCardProps {
    cardPosition: CardPositionType;
    position: CardPositionType;
}

export const StyledCard = styled.div<StyledCardProps>`
    ${flexAligns()}
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: visibility 0.6s ease-in-out;
    transform: ${({ position }) => position === "front" ? "rotateY(0turn)" : "rotateY(-0.5turn)" };
    visibility: ${({ position, cardPosition }) => position === cardPosition ? "visible" : "hidden"};

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: no-repeat center / cover url(${DEFAULT_BG});
        opacity: 0.6;
        border-radius: ${sizes.CARD_BORDER_RADIUS};
    }

    & > .card_content {
        ${flexAligns()}
        flex-direction: column;
        width: 80%;
        height: min-content;

        & span {
            position: relative;

            &.quote {
            margin-bottom: ${sizes.SPACE_5X};
            font-size: ${sizes.CARD_TITLE_FONT_SIZE};
            align-self: flex-start;
        }

        &.author {
            margin-top: ${sizes.SPACE_5X};
            font-size: ${sizes.CARD_AUTHOR_FONT_SIZE};
            align-self: flex-end;

                &::before {
                    content: "- ";
                }
            }
        }
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        & > .card_content {
            & span {
                &.quote {
                    font-size: ${sizes.MOBILE_CARD_TITLE_FONT_SIZE};
                }

                &.author {
                    font-size: ${sizes.MOBILE_CARD_AUTHOR_FONT_SIZE};
                }
            }
        }
    }
`;

export const InnerBtnWrapper = styled.div`
    top: ${sizes.SPACE_5X};
    right: ${sizes.SPACE_5X};
    position: absolute;
    z-index: 1;

    & :not(:first-child) {
        margin-left: ${sizes.SPACE_2X};
    }
`;