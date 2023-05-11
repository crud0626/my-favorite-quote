import React, { useCallback } from 'react';
import { useCardStore, useModalStore, useQuotesStore, useUserStore } from '~/hooks/stores';
import { SVGIconBtn, UserAvatar } from '~/components/common';
import { colors, sizes } from '~/styles/common';
import { LoginButton, StyledNavHeader } from './NavHeader.styles';
import { LoginIcon, LogoutIcon } from '~/assets/icons';

const NavHeader = () => {
    const { userInfo, onLogout } = useUserStore();
    const { replaceQuotes } = useQuotesStore();
    const { toggleLoginModal } = useModalStore();
    const { replaceDisplayQuotes } = useCardStore();

    const onClick = useCallback(() => {
        onLogout()
        .then(result => {
            if (result) {
                replaceQuotes();
                replaceDisplayQuotes();
            }
        });
    }, []);

    return (
        <StyledNavHeader>
            {
                userInfo ? 
                (
                    <>
                        <div>
                            <UserAvatar 
                                userPhotoSrc={userInfo.photoURL} 
                                size={sizes.LARGE_ICON_SIZE} 
                            />
                            <span>
                                {userInfo.displayName || 'Welcome!'}
                            </span>
                        </div>
                        <SVGIconBtn 
                            src={<LogoutIcon />}
                            size={sizes.DEFAULT_ICON_SIZE}
                            color={colors.MAIN_BLACK}
                            hoverColor={colors.ICON_HOVER_COLOR}
                            onClick={onClick}
                            aria-label={"logout"}
                        />
                    </>
                ) : 
                (
                    <LoginButton 
                        aria-label={"login"} 
                        onClick={toggleLoginModal}
                    >
                        <span>LOGIN</span>
                        <div className='icon_wrapper'>
                            <LoginIcon fill={colors.LINK_BLUE} />
                        </div>
                    </LoginButton>
                )
            }
        </StyledNavHeader>
    );
}

export default NavHeader;