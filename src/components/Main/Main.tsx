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
    quoteHistory: QuoteData[];
    requestData(id?: string): Promise<any>;
    handleNav(): void;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen, quoteData, quoteHistory, requestData, handleNav }: IProps) => {
    return(
        <StyledMain>
            <Section 
                quoteData={quoteData}
                requestData={requestData}
            />
            <Nav 
                isNavOpen={isNavOpen} 
                quoteHistory={quoteHistory}
                requestData={requestData}
                handleNav={handleNav}
            />
        </StyledMain>
    );
}

export default Main;