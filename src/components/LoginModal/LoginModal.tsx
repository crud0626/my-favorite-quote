import React, { useCallback } from 'react';
import LoginBoxBody from '~/components/LoginModal/LoginBoxBody/LoginBoxBody';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import SVGIconBtn from '../SVGIconBtn/SVGIconBtn';
import { StyledLoginModal } from './StyledLoginModal';
import { ProviderNames } from '~/types/type';
import { CloseIcon } from '~/assets';

interface IProps {
    onLogin(providerName: ProviderNames): Promise<void>;
    handleLoginBox(): void;
}

const LoginBox = ({ onLogin, handleLoginBox }: IProps) => {
    const onClick = useCallback(({ target, currentTarget }: React.MouseEvent) => {
        if (target === currentTarget) handleLoginBox();
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
                {/* 닫기 버튼 */}
                <SVGIconBtn
                    src={<CloseIcon />}
                    position={'absolute'}
                    top={sizes.SPACE_3X}
                    right={sizes.SPACE_3X}
                    size={sizes.SMALL_ICON_SIZE}
                    color={colors.MAIN_WHITE}
                    hoverColor={colors.ICON_HOVER_COLOR}
                    onClick={() => handleLoginBox()}
                />
            </div>
        </StyledLoginModal>
    );
};

export default LoginBox;