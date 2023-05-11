import styled from 'styled-components';
import { colors, sizes } from '~/styles/common';
import { flexAligns } from '~/styles/mixins';

interface ICardWrapper {
    cardRotation: number;
}

export const CardWrapper = styled.div<ICardWrapper>`
    position: relative;
    width: 100%;
    height: 100%;
    transform: ${({ cardRotation }) => `rotateY(${cardRotation}turn)`};
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

export const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${colors.MAIN_BLACK};

    & > .section {
        ${flexAligns()}
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;

        & .card_section {
            position: relative;
            max-width: 90%;
            height: ${sizes.CARD_HEIGHT};
            aspect-ratio: ${sizes.CARD_ASPECT_RATIO};
        }

        @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}){
            & .card_section {
                height: ${sizes.MOBILE_CARD_HEIGHT};
            }
        }
    }
`;