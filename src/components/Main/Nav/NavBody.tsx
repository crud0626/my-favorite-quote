import React from "react";
import { IQuoteData } from "~/types/interface";
import styled from "styled-components";
import NavContentWrapper from "~/components/Main/Nav/NavContentWrapper";


interface IProps {
    historyList: IQuoteData[];
    favoriteList: IQuoteData[];
    isLoggedIn: boolean;
    onClickNavContent(target: IQuoteData): void;
    onChangeFavorite(target: IQuoteData): void;
}

const StyledNavBody = styled.div`
    width: 100%;
`;

export const NavBody = ({ historyList, favoriteList, isLoggedIn, onClickNavContent, onChangeFavorite }: IProps) => {
    return (
        <StyledNavBody>
            <NavContentWrapper 
                title={"History"}
                contents={historyList}
                onClickNavContent={onClickNavContent}
                onChangeFavorite={onChangeFavorite}
            />
            <NavContentWrapper 
                title={"Favorite"}
                contents={favoriteList}
                onClickNavContent={onClickNavContent}
                onChangeFavorite={onChangeFavorite}
            />
        </StyledNavBody>
    );
}