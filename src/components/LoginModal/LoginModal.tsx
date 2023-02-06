import React, { useCallback } from 'react';
import SocialLoginBox from './SocialLoginBox';
import { StyledLoginModal } from './LoginModal.styles';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import SVGIconBtn from '../common/SVGIconBtn/SVGIconBtn';
import { useLoginBoxStore } from '~/stores/useLoginBoxStore';
import { CloseIcon } from '~/assets';

interface IProps {
    getUserData: (userId: string) => Promise<void>;
}

const LoginBox = ({ getUserData }: IProps) => {
    const { handleLoginBox } = useLoginBoxStore();
    
    const onClick = useCallback(({ target, currentTarget }: React.MouseEvent) => {
        if (target === currentTarget) handleLoginBox();
    }, [handleLoginBox]);
    
    return (
        <StyledLoginModal onClick={onClick}>
            <div className='wrapper'>
                <div className='header'>
                    <h1 className='title'>Welcome back!</h1>
                    <span className='sub_title'>Please enter your details.</span>
                </div>
                <SocialLoginBox 
                    getUserData={getUserData}
                    handleLoginBox={handleLoginBox}
                />
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