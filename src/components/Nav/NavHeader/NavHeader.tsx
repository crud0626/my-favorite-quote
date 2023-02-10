import React, { useCallback } from "react";
import { useUserStore } from "~/stores/useUserStore";
import { useQuotesStore } from "~/stores/useQuotesStore";
import { useCardStore } from "~/stores/useCardStore";
import UserAvatar from "~/components/common/UserAvatar/UserAvatar";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { PrimaryButton } from "~/styles/common/PrimaryButton";
import { LoginButton, StyledNavHeader } from "./NavHeader.styles";
import { LoginIcon, LogoutIcon } from "~/assets";
import { useModalStore } from "~/stores/useModalStore";

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
                                {userInfo.displayName}
                            </span>
                        </div>
                        <PrimaryButton onClick={onClick}>
                            <LogoutIcon fill={colors.MAIN_BLACK} />
                        </PrimaryButton>
                    </>
                ) : 
                (
                    <LoginButton onClick={toggleLoginModal}>
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