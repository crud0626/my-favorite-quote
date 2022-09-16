import React from "react";
import { StyledNavBtn, HamburgerLine } from "~/styles/Header/NavButton/StyledNavBtn";

const lineCount = new Array(3).fill("");

interface IProps {
    isNavOpen: boolean;
    handleNav(): void;
}

export const NavButton = ({ isNavOpen, handleNav }: IProps) => {
    return (
        <StyledNavBtn onClick={handleNav}>
            {lineCount.map((v, i) => <HamburgerLine key={i} isOpen={isNavOpen} />)}
        </StyledNavBtn>
    );
}