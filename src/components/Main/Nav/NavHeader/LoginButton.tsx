import React from 'react';
import Icon from '~/components/Icon/Icon';
import * as colors from '~/styles/common/colors';
import { LOGIN_ICON } from '~/styles/common/iconPath';
import { StyledLoginButton } from '~/styles/Nav/NavHeader/StyledLoginButton';

interface IProps {
    handleLoginBox(): void;
}

const LoginButton = ({ handleLoginBox }: IProps) => {
    return (
        <StyledLoginButton onClick={handleLoginBox}>
            <span>LOGIN</span>
            <div className='login_icon_wrapper'>
                <Icon 
                    define={LOGIN_ICON}
                    color={colors.LINK_BLUE}
                />
            </div>
        </StyledLoginButton>
    );
};

export default LoginButton;