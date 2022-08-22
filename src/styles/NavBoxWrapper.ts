import styled from "styled-components";
import { navBoxMixin } from "./navBoxMixin";
import * as sizes from './common/sizes';

export const NavBoxWrapper = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & div:first-child {
        display: flex;
        align-items: center;

        & :first-child {
            margin-right: ${sizes.SMALL_SPACE_SIZE};
        }
    }
`;