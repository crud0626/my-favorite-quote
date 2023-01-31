import React, { useCallback } from 'react';
import { SocialBox } from './LoginModal.styles';
import { ProviderNames } from '~/types/type';
import { FACEBOOK_LOGO, GITHUB_LOGO, GOOGLE_LOGO } from '~/assets';

interface IProps {
    onLogin(providerName: ProviderNames): Promise<void>;
    handleLoginBox(): void;
}

const socialProviders: ProviderNames[] = ["Google", "Facebook", "Github"];

const SocialLoginBox = ({ onLogin, handleLoginBox }: IProps) => {
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