import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../../styles/common/colors';
import * as sizes from '../../../../styles/common/sizes';
import cardBg from '../../../../assets/card_bg.jpg';
import { StyledButton } from '../../../../styles/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';

const StyledCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    
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

const Card = () => {
    return (
        <StyledCard>
            <div className='card_content'>
                <span className='quote'>From every mountainside, let freedom ring.</span>
                <span className='author'>MARTIN LUTHER KING JR.</span>
            </div>
            <InnerBtnWrapper>
                <StyledButton size={sizes.SMALL_ICON_SIZE}>
                    <FontAwesomeIcon icon={faHeart} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
                </StyledButton>
                <StyledButton size={sizes.SMALL_ICON_SIZE}>
                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
                </StyledButton>
            </InnerBtnWrapper>
        </StyledCard>
    );
};

export default Card;