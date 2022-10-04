import React, { useCallback } from 'react';
import { ProviderNames } from '~/types/type';
import { StyledSocialBox } from '~/styles/LoginModal/LoginBoxBody/StyledSocialBox';
import googleLogo from '~/assets/google-logo.png';
import facebookLogo from '~/assets/facebook-logo.png';

interface IProps {
    providerName: ProviderNames;
    onLogin(providerName: ProviderNames): Promise<void>;
    handleLoginBox(): void;
}

const SocialBox = ({ providerName, onLogin, handleLoginBox }: IProps) => {
    const findLogo = useCallback((name: ProviderNames) => {
        switch(name) {
            case "Google":
                return googleLogo;
            case "Facebook":
                return facebookLogo;
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