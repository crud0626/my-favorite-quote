import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';

const StyledMain = styled.main`
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = () => {
    return(
        <StyledMain></StyledMain>
    );
}

export default Main;