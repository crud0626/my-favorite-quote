import React from 'react';
import styled from 'styled-components';
import Icon from '~/components/Icon/Icon';
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { USER_ICON } from '~/styles/common/iconPath';

interface IStyledProps {
    size?: string;
}

interface IProps extends IStyledProps {
    userPhotoSrc: string | null;
}

const StyledThumbnail = styled.div<IStyledProps>`
    width: ${props => props.size || sizes.DEFAULT_ICON_SIZE};
    height: ${props => props.size || sizes.DEFAULT_ICON_SIZE};

    & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

const UserThumbnail = ({ userPhotoSrc, size = sizes.DEFAULT_ICON_SIZE }: IProps) => {
    return (
        <StyledThumbnail size={size}>
            {
                userPhotoSrc 
                ? <img src={userPhotoSrc} alt="user thumbnail" /> 
                : <Icon color={colors.MAIN_BLACK} define={USER_ICON} />
            }
        </StyledThumbnail>
    );
};

export default UserThumbnail;