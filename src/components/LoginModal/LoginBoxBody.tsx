import React from 'react';
import SocialBox from '~/components/LoginModal/SocialBox';

export type ProviderNames = "google";

interface IProps {
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const LoginBoxBody = ({ onLogin, handleLoginBox }: IProps) => {
    const socialProviders: ProviderNames[] = ["google"];

    return (
        <div>
            {socialProviders.map((name, index) => 
                <SocialBox 
                    key={index} 
                    providerName={name} 
                    onLogin={onLogin} 
                    handleLoginBox={handleLoginBox}
                />
            )}
        </div>
    );
};

export default LoginBoxBody;