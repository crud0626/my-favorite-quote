import styled from 'styled-components';
import { sizes } from '~/styles/common';

export interface IStyledUserAvatar {
    size?: string;
}

export const StyledUserAvatar = styled.div<IStyledUserAvatar>`
    width: ${props => props.size || sizes.DEFAULT_ICON_SIZE};
    height: ${props => props.size || sizes.DEFAULT_ICON_SIZE};

    & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;