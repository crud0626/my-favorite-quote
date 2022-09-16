import styled from 'styled-components';
import { navBoxMixin } from '~/styles/mixins/navBoxMixin';

export const StyledNoContents = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;