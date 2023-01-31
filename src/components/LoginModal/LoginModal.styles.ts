import styled from 'styled-components';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledButton } from '~/styles/common/StyledButton';

export const SocialBox = styled(StyledButton)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${sizes.SOCIAL_LOGIN_COTENT_WIDTH};
    height: ${sizes.SOCIAL_LOGIN_COTENT_HEIGHT};
    margin-top: ${sizes.SPACE_4X};
    padding: 0 ${sizes.SPACE_7X};
    border: 1px solid ${colors.MAIN_WHITE};
    border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
    color: ${colors.MAIN_WHITE};

    &:hover {
        background: ${colors.MAIN_WHITE};
        color: ${colors.MAIN_BLACK};
    }

    & > img {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;

export const StyledLoginModal = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colors.CONTAINER_ALPHA};
    z-index: 5;

    & > .wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: ${sizes.SPACE_5X};
        background-color: ${colors.MAIN_BLACK};
        border-radius: ${sizes.CARD_BORDER_RADIUS};

        & > .header {
            margin: ${sizes.SPACE_5X} 0;
            text-align: center;

            & > .title {
                font-size: ${sizes.SUB_HEAD_FONT_SIZE};
            }

            & > .sub_title {
                display: block;
                margin-top: ${sizes.SPACE_2X};
            }
        }
    }
`;