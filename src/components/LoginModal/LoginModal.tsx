import React from 'react';
import styled from 'styled-components';
import LoginBoxBody from './LoginBoxBody';
import Icon from '../Icon/Icon';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { CLOSE_ICON } from '../../styles/common/iconPath';
import { StyledButton } from '../../styles/common/StyledButton';
import { StyledLoginModal } from '../../styles/LoginModal/StyledLoginModal';

interface IProps {
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

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
        <StyledLoginModal onClick={onClick}>
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
        </StyledLoginModal>
    );
};

export default LoginBox;