import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../styles/common/sizes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

interface IStyledProps {
    size?: string;
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

interface IProps extends IStyledProps {
    src?: string;
}

const UserThumbnail = ({ src, size = sizes.DEFAULT_ICON_SIZE }: IProps) => {
    return (
        <StyledThumbnail size={size}>
            { 
                src ||
                <FontAwesomeIcon 
                    icon={faCircleUser} 
                    style={{ width: "100%", height: "100%" }}
                />
            }
        </StyledThumbnail>
    );
};

export default UserThumbnail;