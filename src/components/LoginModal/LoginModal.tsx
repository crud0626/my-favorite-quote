import React, { useCallback } from 'react';
import { SVGIconBtn } from '~/components/common';
import { useModalStore } from '~/hooks/stores';
import SocialWrapper from './SocialWrapper';
import { StyledLoginModal } from './LoginModal.styles';
import { colors, sizes } from '~/styles/common';
import { CloseIcon } from '~/assets/icons';

const LoginModal = () => {
    const { toggleLoginModal } = useModalStore();
    
    const onClickOuterModal = useCallback(({ target, currentTarget }: React.MouseEvent<HTMLElement>) => {
        if (target === currentTarget) toggleLoginModal();
    }, []);
    
    return (
        <StyledLoginModal onClick={onClickOuterModal}>
            <div className='wrapper'>
                <div className='header'>
                    <h1 className='title'>Welcome back!</h1>
                    <span className='sub_title'>Please enter your details.</span>
                </div>
                <SocialWrapper />
                <SVGIconBtn
                    src={<CloseIcon />}
                    position={'absolute'}
                    top={sizes.SPACE_3X}
                    right={sizes.SPACE_3X}
                    size={sizes.SMALL_ICON_SIZE}
                    color={colors.MAIN_WHITE}
                    hoverColor={colors.ICON_HOVER_COLOR}
                    aria-label={'close login modal'}
                    onClick={toggleLoginModal}
                />
            </div>
        </StyledLoginModal>
    );
};

export default LoginModal;