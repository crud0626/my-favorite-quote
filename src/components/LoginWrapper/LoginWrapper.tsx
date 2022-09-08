import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import SocialLoginWrapper from './SocialLoginWrapper';

interface IProps {
    onLogin(): Promise<void>;
    handleLoginWrapper(): void;
}

const StyledLoginWrapper = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colors.CONTAINER_ALPHA};
    z-index: 5;

    & > .login_wrapper {
        display: flex;
        flex-direction: column;
        padding: 20px;
        /* 임시 */
        width: 300px;
        height: 300px;
        /*  */
        background-color: ${colors.MAIN_BLACK};
        border-radius: ${sizes.CARD_BORDER_RADIUS};

        & > .text_box {
            margin: 20px 0;
            text-align: center;

            & > .title {
                font-size: 1.2rem; // sizes에 추가
            }

            & > .sub_title {
                display: block;
                margin-top: 10px;
            }
        }
    }
`;

const LoginWrapper = ({ onLogin, handleLoginWrapper }: IProps) => {
    const onClick = (event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleLoginWrapper();
        }
    }
    
    return (
        <StyledLoginWrapper onClick={onClick}>
            <div className='login_wrapper'>
                <div className='text_box'>
                    <h1 className='title'>Welcome back!</h1>
                    <span className='sub_title'>Please enter your details.</span>
                </div>
                <SocialLoginWrapper 
                    onLogin={onLogin}
                />
            </div>
        </StyledLoginWrapper>
    );
};

export default LoginWrapper;