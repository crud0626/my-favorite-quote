import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';

export interface IStyledThumbnail {
    size?: string;
}

export const StyledUserThumbnail = styled.div<IStyledThumbnail>`
    width: ${props => props.size || sizes.DEFAULT_ICON_SIZE};
    height: ${props => props.size || sizes.DEFAULT_ICON_SIZE};

    & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;