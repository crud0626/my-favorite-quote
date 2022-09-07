import React from 'react';
import styled from 'styled-components';
import Icon from '../../../Icon/Icon';
import { QuoteData } from '../../../../App';
import { CardPositionType } from '../../../../App';
import * as colors from '../../../../styles/common/colors';
import * as sizes from '../../../../styles/common/sizes';
import { StyledButton } from '../../../../styles/StyledButton';
import { DOWNLOAD_ICON, EMPTY_HEART_ICON, FILL_HEART_ICON } from '../../../../styles/common/iconPath';
import cardBg from '../../../../assets/card_bg.jpg';

interface StyledProps {
    exposedCard: CardPositionType;
    position: CardPositionType;
}

interface RenderProps extends StyledProps {
    quoteData: QuoteData | null;
    onDownload(): void;
    onChangeFavorite(target: QuoteData): void;
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

const Card = ({ position, exposedCard, quoteData, onDownload, onChangeFavorite }: RenderProps) => {
    return (
        <StyledCard position={position} exposedCard={exposedCard}>
            {quoteData &&
                <>
                    <div data-id={quoteData.id} className='card_content'>
                        <span className='quote'>{quoteData.quote}</span>
                        <span className='author'>{quoteData.author}</span>
                    </div>
                    <InnerBtnWrapper className='inner_btn_wrapper'>
                        <StyledButton size={sizes.SMALL_ICON_SIZE} onClick={() => onChangeFavorite(quoteData)}>
                            {
                                quoteData?.favorite
                                ? <Icon define={FILL_HEART_ICON} color={colors.BUTTON_RED} isHoverColor={true} />
                                : <Icon define={EMPTY_HEART_ICON} color={colors.MAIN_WHITE} isHoverColor={true} />
                            }
                        </StyledButton>
                        <StyledButton size={sizes.SMALL_ICON_SIZE} onClick={() => onDownload()}>
                            <Icon 
                                define={DOWNLOAD_ICON}
                                color={colors.MAIN_WHITE}
                                isHoverColor={true}
                            />
                        </StyledButton>
                    </InnerBtnWrapper>
                </>
            }
        </StyledCard>
    );
};

export default Card;