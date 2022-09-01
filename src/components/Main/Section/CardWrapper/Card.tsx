import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../../styles/common/colors';
import * as sizes from '../../../../styles/common/sizes';
import { StyledButton } from '../../../../styles/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardPositionTypes } from '../Section';
import { QuoteData } from '../../../../services/quotesApi';
import cardBg from '../../../../assets/card_bg.jpg';

interface StyledProps {
    exposedCard: CardPositionTypes;
    position: CardPositionTypes;
}

interface RenderProps extends StyledProps {
    onDownload(): void;
    quoteData: QuoteData | null;
}

const StyledCard = styled.div<StyledProps>`
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

const InnerBtnWrapper = styled.div`
    top: ${sizes.SPACE_5X};
    right: ${sizes.SPACE_5X};
    position: absolute;
    z-index: 1;

    & :not(:first-child) {
        margin-left: ${sizes.SPACE_2X};
    }
`;

const Card = ({ position, exposedCard, quoteData, onDownload }: RenderProps) => {
    return (
        <StyledCard position={position} exposedCard={exposedCard}>
            {quoteData &&
                <div data-id={quoteData.id} className='card_content'>
                    <span className='quote'>{quoteData.quote}</span>
                    <span className='author'>{quoteData.author}</span>
                </div>
            }
            <InnerBtnWrapper className='inner_btn_wrapper'>
                <StyledButton size={sizes.SMALL_ICON_SIZE}>
                    <FontAwesomeIcon icon={faHeart} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
                </StyledButton>
                <StyledButton size={sizes.SMALL_ICON_SIZE} onClick={() => onDownload()}>
                    <FontAwesomeIcon icon={faFileArrowDown} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
                </StyledButton>
            </InnerBtnWrapper>
        </StyledCard>
    );
};

export default Card;