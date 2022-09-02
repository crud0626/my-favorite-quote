import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/common/colors';

interface IProps {
    handleLoginWrapper(): void;
}

const StyledLoginWrapper = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colors.CONTAINER_ALPHA};
    z-index: 5;
`;

const LoginWrapper = ({ handleLoginWrapper }: IProps) => {
    const onClick = (event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleLoginWrapper();
        }
    }

    return (
        <StyledLoginWrapper onClick={onClick}>
            {/* loginBox */}
            {/* login */}
            {/* loginBox */}
        </StyledLoginWrapper>
    );
};

export default LoginWrapper;
