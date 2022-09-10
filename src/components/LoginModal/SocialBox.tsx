import React from 'react';
import { ProviderNames } from './LoginBoxBody';
import googleLogo from '../../assets/google-logo.png';
import { StyledSocialBox } from '../../styles/LoginModal/StyledSocialBox';

interface IProps {
    providerName: ProviderNames;
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const SocialBox = ({ providerName, onLogin, handleLoginBox }: IProps) => {
    const displayName = providerName[0].toUpperCase() + providerName.slice(1);

    const findLogo = (name: ProviderNames) => {
        if(name === "google") {
            return googleLogo;
        }
    }

    const onClick = () => {
        onLogin()
        .then(() => handleLoginBox());
    }

    return (
        <StyledSocialBox onClick={onClick}>
            <img draggable="false" src={findLogo(providerName)} />
            <span>{`Sign in with ${displayName}`}</span>
        </StyledSocialBox>
    );
};

export default SocialBox;