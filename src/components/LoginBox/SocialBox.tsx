import React from 'react';
import styled from 'styled-components';
import { ProviderNames } from './LoginBoxBody';
import { StyledButton } from '../../styles/StyledButton';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';
import googleLogo from '../../assets/google-logo.png';

interface IProps {
    providerName: ProviderNames;
    onLogin(): Promise<void>;
    handleLoginBox(): void;
}

const StyledSocialBox = styled(StyledButton)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${sizes.SOCIAL_LOGIN_COTENT_WIDTH};
    height: ${sizes.SOCIAL_LOGIN_COTENT_HEIGHT};
    margin-top: ${sizes.SPACE_4X};
    padding: 0 ${sizes.SPACE_7X};
    border: 1px solid ${colors.MAIN_WHITE};
    border-radius: ${sizes.DEFAULT_BORDER_RADIUS};
    color: ${colors.MAIN_WHITE};

    &:hover {
        background: ${colors.MAIN_WHITE};
        color: ${colors.MAIN_BLACK};
    }

    & > img {
        width: ${sizes.SMALL_ICON_SIZE};
        height: ${sizes.SMALL_ICON_SIZE};
    }
`;

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