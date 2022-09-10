import React from 'react';
import styled from 'styled-components';
import { navBoxMixin } from '~/styles/mixins/navBoxMixin';

const StyledNoContents = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NoContents = () => {
    return (
        <StyledNoContents>
            <span>No Contents</span>
        </StyledNoContents>
    );
};

export default NoContents;