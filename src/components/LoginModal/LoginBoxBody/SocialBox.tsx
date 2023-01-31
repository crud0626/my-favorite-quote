import React, { useCallback } from 'react';
import { StyledSocialBox } from './StyledSocialBox';
import { ProviderNames } from '~/types/type';
import { FACEBOOK_LOGO, GITHUB_LOGO, GOOGLE_LOGO } from '~/assets';

interface IProps {
    providerName: ProviderNames;
    onLogin(providerName: ProviderNames): Promise<void>;
    handleLoginBox(): void;
}

const SocialBox = ({ providerName, onLogin, handleLoginBox }: IProps) => {
    const findLogo = useCallback((name: ProviderNames) => {
        switch(name) {
            case "Google":
                return GOOGLE_LOGO;
            case "Facebook":
                return FACEBOOK_LOGO;
            case "Github":
                return GITHUB_LOGO;
        }
    }, []);

    const onClick = useCallback(() => {
        onLogin(providerName)
        .then(() => handleLoginBox());
    }, []);
    
    return (
        <StyledSocialBox onClick={onClick}>
            <img draggable="false" src={findLogo(providerName)} />
            <span>{`Sign in with ${providerName}`}</span>
        </StyledSocialBox>
    );
};

export default SocialBox;