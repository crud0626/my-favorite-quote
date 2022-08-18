import React, { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../../../styles/StyledButton";
import { Line } from "./Line/Line";

const iconCount = new Array(3).fill("");

const StyledNavBtn = styled(StyledButton)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const NavButton = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    return (
        <StyledNavBtn onClick={() => setIsNavOpen(state => !state)}>
            {iconCount.map((v, i) => <Line key={i} isOpen={isNavOpen} />)}
        </StyledNavBtn>
    );
}