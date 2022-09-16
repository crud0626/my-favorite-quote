import React, { useCallback } from 'react';
import LoginBoxBody from '~/components/LoginModal/LoginBoxBody/LoginBoxBody';
import Icon from '~/components/Icon/Icon';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { CLOSE_ICON } from '~/styles/common/iconPath';
import { StyledLoginModal, CloseBtn } from '~/styles/LoginModal/StyledLoginModal';

interface IProps {
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const LoginBox = ({ onLogin, handleLoginBox }: IProps) => {
    const onClick = useCallback((event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleLoginBox();
        }
    }, [handleLoginBox]);
    
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