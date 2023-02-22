import React, { useCallback } from 'react';
import { SocialBox } from './LoginModal.styles';
import { useUserStore } from '~/stores/useUserStore';
import { useModalStore } from '~/stores/useModalStore';
import { socialProviders } from '~/constants/login';
import { ProviderNames } from '~/types/auth.type';
import { FACEBOOK_LOGO, GITHUB_LOGO, GOOGLE_LOGO } from '~/assets/logos';

const SocialWrapper = () => {
    const { onLogin } = useUserStore();
    const { toggleLoginModal } = useModalStore();

    const setLogo = useCallback((name: ProviderNames) => {
        switch(name) {
            case "Google":
                return GOOGLE_LOGO;
            case "Facebook":
                return FACEBOOK_LOGO;
            case "Github":
                return GITHUB_LOGO;
        }
    }, []);

    const onClick = useCallback(async (providerName: ProviderNames): Promise<void> => {
        const userInfo = await onLogin(providerName);

        if (userInfo) toggleLoginModal();
    }, []);

    return (
        <div>
            {socialProviders.map((provider, i) => 
                <SocialBox 
                    key={i} 
                    onClick={() => onClick(provider)}
                >
                    <img 
                        src={setLogo(provider)} 
                        draggable="false" 
                    />
                    <span>{`Sign in with ${provider}`}</span>
                </SocialBox>
            )}
        </div>
    );
};

export default SocialWrapper;