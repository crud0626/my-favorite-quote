import React from 'react';
import * as colors from '~/styles/common/colors';
import { StyledLoginButton } from './StyledLoginButton';
import { LoginIcon } from '~/assets';

interface IProps {
    handleLoginBox(): void;
}

const LoginButton = ({ handleLoginBox }: IProps) => {
    return (
        <StyledLoginButton onClick={handleLoginBox}>
            <span>LOGIN</span>
            <div className='login_icon_wrapper'>
                <LoginIcon fill={colors.LINK_BLUE} />
            </div>
        </StyledLoginButton>
    );
};

export default LoginButton;