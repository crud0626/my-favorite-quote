import React from 'react';
import SocialBox from '~/components/LoginModal/LoginBoxBody/SocialBox';
import { ProviderNames } from '~/types/type';

interface IProps {
    onLogin(providerName: ProviderNames): Promise<void>;
    handleLoginBox(): void;
}

const socialProviders: ProviderNames[] = ["Google", "Facebook", "Github"];

const LoginBoxBody = ({ onLogin, handleLoginBox }: IProps) => {
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