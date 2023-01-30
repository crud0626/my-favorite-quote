import React from 'react';
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { StyledUserThumbnail, IStyledThumbnail } from './StyledUserThumbnail';
import { UserIcon } from '~/assets';

interface IProps extends IStyledThumbnail {
    userPhotoSrc: string | null;
}

const UserThumbnail = ({ userPhotoSrc, size = sizes.DEFAULT_ICON_SIZE }: IProps) => {
    return (
        <StyledUserThumbnail size={size}>
            {
                userPhotoSrc 
                ? <img src={userPhotoSrc} alt="user thumbnail" /> 
                : <UserIcon color={colors.MAIN_BLACK} />
            }
        </StyledUserThumbnail>
    );
};

export default UserThumbnail;