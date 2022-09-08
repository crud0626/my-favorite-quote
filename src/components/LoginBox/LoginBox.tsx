import React from 'react';
import styled from 'styled-components';
import LoginBoxBody from './LoginBoxBody';
import Icon from '../Icon/Icon';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { CLOSE_ICON } from '../../styles/common/iconPath';
import { StyledButton } from '../../styles/StyledButton';

interface IProps {
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const StyledLoginBoxWrapper = styled.div`
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

const CloseBtn = styled(StyledButton)`
    position: absolute;
    top: ${sizes.SPACE_3X};
    right: ${sizes.SPACE_3X};
`;

const LoginBox = ({ onLogin, handleLoginBox }: IProps) => {
    const onClick = (event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleLoginBox();
        }
    }
    
    return (
        <StyledLoginBoxWrapper onClick={onClick}>
            <div className='login_box'>
                <div className='login_box_header'>
                    <h1 className='title'>Welcome back!</h1>
                    <span className='sub_title'>Please enter your details.</span>
                </div>
                <LoginBoxBody
                    onLogin={onLogin}
                    handleLoginBox={handleLoginBox}
                />
                <CloseBtn 
                    size={sizes.SMALL_ICON_SIZE}
                    onClick={handleLoginBox}
                >
                    <Icon 
                        define={CLOSE_ICON}
                        color={colors.MAIN_WHITE}
                        isHoverColor={true}
                    />
                </CloseBtn>
            </div>
        </StyledLoginBoxWrapper>
    );
};

export default LoginBox;