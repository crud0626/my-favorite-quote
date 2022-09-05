import React from 'react';
import styled from 'styled-components';
import Nav from './Nav/Nav';
import Section from './Section/Section';
import { CardPositionType, QuoteStateType } from '../../App';
import * as sizes from '../../styles/common/sizes';
import * as colors from '../../styles/common/colors';
import { QuoteData } from '../../services/quotesApi';

interface IProps {
    isNavOpen: boolean;
    quoteData: QuoteStateType;
    quoteHistory: QuoteData[];
    exposedCard: CardPositionType;
    requestData(id?: string): Promise<any>;
    handleNav(): void;
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;

const Main = ({ isNavOpen, quoteData, quoteHistory, exposedCard, requestData, handleNav }: IProps) => {
    return(
        <StyledMain>
            <Section 
                quoteData={quoteData}
                requestData={requestData}
                exposedCard={exposedCard}
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