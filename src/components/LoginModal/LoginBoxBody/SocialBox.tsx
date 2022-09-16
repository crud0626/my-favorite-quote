import React, { useCallback } from 'react';
import { ProviderNames } from '~/types/type';
import { StyledSocialBox } from '~/styles/LoginModal/LoginBoxBody/StyledSocialBox';
import googleLogo from '~/assets/google-logo.png';

interface IProps {
    providerName: ProviderNames;
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const SocialBox = ({ providerName, onLogin, handleLoginBox }: IProps) => {
    const findLogo = useCallback((name: ProviderNames) => {
        if(name === "google") {
            return googleLogo;
        }
    }, []);

    const onClick = useCallback(() => {
        onLogin()
        .then(() => handleLoginBox());
    }, []);

    const displayName = providerName[0].toUpperCase() + providerName.slice(1);
    
    return (
        <StyledSocialBox onClick={onClick}>
            <img draggable="false" src={findLogo(providerName)} />
            <span>{`Sign in with ${displayName}`}</span>
        </StyledSocialBox>
    );
};

export default SocialBox;