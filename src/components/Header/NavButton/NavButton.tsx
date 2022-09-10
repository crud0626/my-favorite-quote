import React from "react";
import styled from "styled-components";
import { StyledButton } from "../../../styles/StyledButton";
import { Line } from "../../../styles/Line";

const iconCount = new Array(3).fill("");

interface IProps {
    isNavOpen: boolean;
    handleNav(): void;
}

const StyledNavBtn = styled(StyledButton)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const NavButton = ({ isNavOpen, handleNav }: IProps) => {
    return (
        <StyledNavBtn onClick={handleNav}>
            {iconCount.map((v, i) => <Line key={i} isOpen={isNavOpen} />)}
        </StyledNavBtn>
    );
}