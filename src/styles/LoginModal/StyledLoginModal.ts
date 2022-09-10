import styled from 'styled-components';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';

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

    & > .login_box {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: ${sizes.SPACE_5X};
        background-color: ${colors.MAIN_BLACK};
        border-radius: ${sizes.CARD_BORDER_RADIUS};

        & > .login_box_header {
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