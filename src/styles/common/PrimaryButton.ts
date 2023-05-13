import styled from 'styled-components';
import { sizes } from './';

interface IProps {
    size?: string;
}

export const PrimaryButton = styled.button<IProps>`
    width: ${(props) => props.size || sizes.DEFAULT_ICON_SIZE};
    height: ${(props) => props.size || sizes.DEFAULT_ICON_SIZE};
    padding: 0;
    border: 0;
`;