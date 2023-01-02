import React from 'react';
import Icon from '~/components/Icon/Icon';
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { USER_ICON } from '~/styles/common/iconPath';
import { StyledUserThumbnail, IStyledThumbnail } from './StyledUserThumbnail';

interface IProps extends IStyledThumbnail {
    userPhotoSrc: string | null;
}

const UserThumbnail = ({ userPhotoSrc, size = sizes.DEFAULT_ICON_SIZE }: IProps) => {
    return (
        <StyledUserThumbnail size={size}>
            {
                userPhotoSrc 
                ? <img src={userPhotoSrc} alt="user thumbnail" /> 
                : <Icon color={colors.MAIN_BLACK} define={USER_ICON} />
            }
        </StyledUserThumbnail>
    );
};

export default UserThumbnail;