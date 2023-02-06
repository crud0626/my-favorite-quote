import React, { useCallback } from 'react';
import { SocialBox } from './LoginModal.styles';
import { IAuthService, ProviderNames } from '~/types/auth.type';
import { socialProviders } from '~/constants/login';
import { FACEBOOK_LOGO, GITHUB_LOGO, GOOGLE_LOGO } from '~/assets';
import { useUserStore } from '~/stores/useUserStore';

interface IProps {
    authService: IAuthService;
    getUserData: (userId: string) => Promise<void>;
    handleLoginBox(): void;
}

const SocialLoginBox = ({ authService, getUserData, handleLoginBox }: IProps) => {
    const { updateUserInfo } = useUserStore();
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

    const onLogin = async (providerName: ProviderNames): Promise<void> => {
        const userInfo = await authService.requestLogin(providerName);
        if(userInfo) {
            updateUserInfo(userInfo);

            if (userInfo.uid) getUserData(userInfo.uid);
        }
    }

    const onClick = useCallback((name: ProviderNames) => {
        onLogin(name)
        .then(() => handleLoginBox());
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