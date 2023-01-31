import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';

export const CardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
`;

export const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};

    & > .section {
        display: flex;
        justify-content: center;
        align-items: center;
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