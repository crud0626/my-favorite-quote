import React from "react";
import styled from "styled-components";
import NavContentWrapper from "./NavContentWrapper";

export interface IQuotes {
    quote: string;
    author: string;
    favorite: boolean;
}

export interface ContentProps {
    title: "History" | "Favorite";
    contents: IQuotes[];
}

const StyledNavBody = styled.div`
    width: 100%;
`;

export const NavBody = () => {
    return (
        <StyledNavBody>
            <NavContentWrapper 
                title={"History"}
                contents={[{
                    quote: "From every mountainside, let freedom ring.",
                    author: "MARTIN LUTHER KING JR.",
                    favorite: false
                }]}
            />
            <NavContentWrapper 
                title={"Favorite"}
                contents={[{
                    quote: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, soluta natus ea accusamus reiciendis maxime consequatur, quam distinctio magni nobis veritatis at dolorem? Temporibus, quibusdam dolorem placeat sapiente ipsum aliquid!",
                    author: "MARTIN LUTHER KING JR.",
                    favorite: true
                }]}
            />
        </StyledNavBody>
    );
}