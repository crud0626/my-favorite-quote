import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';

interface IProps {
    size?: string;
}

export const StyledButton = styled.button<IProps>`
    width: ${(props) => props.size || sizes.DEFAULT_ICON_SIZE};
    height: ${(props) => props.size || sizes.DEFAULT_ICON_SIZE};
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
`;