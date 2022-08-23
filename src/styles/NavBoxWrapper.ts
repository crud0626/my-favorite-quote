import styled from "styled-components";
import { navBoxMixin } from "./navBoxMixin";
import * as sizes from './common/sizes';

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