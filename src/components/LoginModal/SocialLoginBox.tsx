import React, { useCallback } from 'react';
import { SocialBox } from './LoginModal.styles';
import { useUserStore } from '~/stores/useUserStore';
import { useCardStore } from '~/stores/useCardStore';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useModalStore } from '~/stores/useModalStore';
import { socialProviders } from '~/constants/login';
import { ProviderNames } from '~/types/auth.type';
import { FACEBOOK_LOGO, GITHUB_LOGO, GOOGLE_LOGO } from '~/assets';

const SocialLoginBox = () => {
    const { changeDisplayQuote } = useCardStore();
    const { onLogin } = useUserStore();
    const { getUserQuotes } = useQuotesStore();
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

        if (!userInfo) return;

        const resQuotes = await getUserQuotes(userInfo.uid);
        if (resQuotes) {
            const latestHistory = resQuotes.history[0] || null;
            if (latestHistory) changeDisplayQuote(latestHistory);
        }

        toggleLoginModal();
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

export default SocialLoginBox;