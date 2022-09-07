import React from "react";
import styled from "styled-components";
import NavContentWrapper from "./NavContentWrapper";
import { QuoteData } from '../../../App';

interface IProps {
    quoteHistory: QuoteData[];
    favoriteQuotes: QuoteData[];
    isLoggedIn: boolean;
    requestData(id?: string): Promise<any>;
    onChangeFavorite(target: QuoteData): void;
}

const StyledNavBody = styled.div`
    width: 100%;
`;

export const NavBody = ({ quoteHistory, favoriteQuotes, isLoggedIn, requestData, onChangeFavorite }: IProps) => {
    return (
        <StyledNavBody>
            <NavContentWrapper 
                title={"History"}
                contents={quoteHistory}
                requestData={requestData}
                onChangeFavorite={onChangeFavorite}
            />
            <NavContentWrapper 
                title={"Favorite"}
                contents={favoriteQuotes}
                requestData={requestData}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledNavBody>
    );
}