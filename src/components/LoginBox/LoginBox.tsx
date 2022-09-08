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
        padding: 20px;
        background-color: ${colors.MAIN_BLACK};
        border-radius: ${sizes.CARD_BORDER_RADIUS};

        & > .login_box_header {
            margin: 20px 0;
            text-align: center;

            & > .title {
                font-size: ${sizes.SUB_HEAD_FONT_SIZE};
            }

            & > .sub_title {
                display: block;
                margin-top: 8px;
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
                    onClick={handleLoginBox}
                    size={sizes.SMALL_ICON_SIZE}
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