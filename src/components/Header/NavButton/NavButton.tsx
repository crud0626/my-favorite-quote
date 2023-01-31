import React from "react";
import { StyledNavButton, HamburgerLine } from "./StyledNavButton";

const lineCount = new Array(3).fill("");

interface IProps {
    isNavOpen: boolean;
    handleNav(): void;
}

export const NavButton = ({ isNavOpen, handleNav }: IProps) => {
    return (
        <StyledNavButton onClick={handleNav}>
            {lineCount.map((v, i) => <HamburgerLine key={i} isOpen={isNavOpen} />)}
        </StyledNavButton>
    );
}