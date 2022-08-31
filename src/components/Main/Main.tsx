import React from 'react';
import Nav from './Nav/Nav';
import Section from './Section/Section';
import styled from 'styled-components';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';
import { QuoteData } from '../../services/quotesApi';

interface IProps {
    isNavOpen: boolean;
    quoteData: QuoteData | null;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen, quoteData }: IProps) => {
    return(
        <StyledMain>
            <Section quoteData={quoteData}/>
            <Nav isNavOpen={isNavOpen} />
        </StyledMain>
    );
}

export default Main;