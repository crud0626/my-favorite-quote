import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';
import Nav from './Nav/Nav';

interface IProps {
    isNavOpen: boolean;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen }: IProps) => {
    return(
        <>
            <StyledMain>
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}>
                    <span>HiHiHi</span>
                </div>
                <Nav isNavOpen={isNavOpen} />
            </StyledMain>
        </>
    );
}

export default Main;