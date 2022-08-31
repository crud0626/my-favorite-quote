import React from "react";
import styled from "styled-components";
import { QuoteData } from "../../../services/quotesApi";
import NavContentWrapper from "./NavContentWrapper";

interface IProps {
    quoteHistory: QuoteData[];
}

const StyledNavBody = styled.div`
    width: 100%;
`;

export const NavBody = ({ quoteHistory }: IProps) => {
    return (
        <StyledNavBody>
            <NavContentWrapper 
                title={"History"}
                contents={quoteHistory}
            />
            <NavContentWrapper 
                title={"Favorite"}
                contents={[{
                    id: "123",
                    quote: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, soluta natus ea accusamus reiciendis maxime consequatur, quam distinctio magni nobis veritatis at dolorem? Temporibus, quibusdam dolorem placeat sapiente ipsum aliquid!",
                    author: "MARTIN LUTHER KING JR.",
                }]}
            />
        </StyledNavBody>
    );
}