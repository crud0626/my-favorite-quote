import styled from 'styled-components';
import { CardPositionType } from '../App';
import * as sizes from './common/sizes';
import cardBg from '../assets/card_bg.jpg';

export interface StyledCardProps {
    exposedCard: CardPositionType;
    position: CardPositionType;
}

export const StyledCard = styled.div<StyledCardProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: visibility 0.6s ease-in-out;
    transform: ${({ position }) => position === "front" ? "rotateY(0turn)" : "rotateY(-0.5turn)" };
    visibility: ${({ position, exposedCard }) => position === exposedCard ? "visible" : "hidden"};

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: no-repeat center / cover url(${cardBg});
        opacity: 0.6;
        border-radius: ${sizes.CARD_BORDER_RADIUS};
    }

    & > .card_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 80%;
        height: min-content;

        & span {
            position: relative;

            &.quote {
            margin-bottom: ${sizes.SPACE_5X};
            font-size: ${sizes.HEAD_FONT_SIZE};
            align-self: flex-start;
        }

        &.author {
            margin-top: ${sizes.SPACE_5X};
            font-size: ${sizes.SUB_FONT_SIZE};
            align-self: flex-end;

                &::before {
                    content: "- ";
                }
            }
        }
    }
`;