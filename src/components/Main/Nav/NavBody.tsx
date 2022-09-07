import React from "react";
import styled from "styled-components";
import NavContentWrapper from "./NavContentWrapper";
import { QuoteData } from '../../../App';

interface IProps {
    quoteHistory: QuoteData[];
    favoriteQuotes: QuoteData[];
    isLoggedIn: boolean;
    onClickNavContent(target: QuoteData): void;
    onChangeFavorite(target: QuoteData): void;
}

const StyledNavBody = styled.div`
    width: 100%;
`;

export const NavBody = ({ quoteHistory, favoriteQuotes, isLoggedIn, onClickNavContent, onChangeFavorite }: IProps) => {
    return (
        <StyledNavBody>
            <NavContentWrapper 
                title={"History"}
                contents={quoteHistory}
                onClickNavContent={onClickNavContent}
                onChangeFavorite={onChangeFavorite}
            />
            <NavContentWrapper 
                title={"Favorite"}
                contents={favoriteQuotes}
                onClickNavContent={onClickNavContent}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledNavBody>
    );
}