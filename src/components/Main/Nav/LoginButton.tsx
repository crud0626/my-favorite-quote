import React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon/Icon';
import { StyledButton } from '../../../styles/StyledButton';
import * as colors from '../../../styles/common/colors';
import * as sizes from '../../../styles/common/sizes';
import { LOGIN_ICON } from '../../../styles/common/iconPath';

interface IProps {
    onLogin(): Promise<void>;
}

const StyledLoginButton = styled(StyledButton)`
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 60%;
    padding: 5px 10px;
    border-radius: ${sizes.SMALL_BORDER_RADIUS};
    border: 1px solid ${colors.LINK_BLUE};
    color: ${colors.LINK_BLUE};

    & > span {
        margin-right: ${sizes.SPACE_2X};
    }

    & > .login_icon_wrapper {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;

const LoginButton = ({ onLogin }: IProps) => {
    return (
        <StyledLoginButton onClick={onLogin}>
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