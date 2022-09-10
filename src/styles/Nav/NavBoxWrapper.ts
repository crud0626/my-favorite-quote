import styled from "styled-components";
import { navBoxMixin } from "../mixins/navBoxMixin";

export const NavBoxWrapper = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & :first-child {
        display: flex;
        align-items: center;
    }
`;