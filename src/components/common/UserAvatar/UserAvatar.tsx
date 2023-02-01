import React from 'react';
import * as colors from '~/styles/common/colors';
import { StyledUserAvatar, IStyledUserAvatar } from './UserAvatar.styles';
import { UserIcon } from '~/assets';

interface IProps extends IStyledUserAvatar {
    userPhotoSrc: string | null;
}

const UserAvatar = ({ userPhotoSrc, size }: IProps) => {
    return (
        <StyledUserAvatar size={size}>
            {
                userPhotoSrc 
                ? <img src={userPhotoSrc} alt="user thumbnail" /> 
                : <UserIcon color={colors.MAIN_BLACK} />
            }
        </StyledUserAvatar>
    );
};

export default UserAvatar;