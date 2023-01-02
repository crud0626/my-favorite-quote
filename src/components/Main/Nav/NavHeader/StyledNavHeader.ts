import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';
import { StyledNavBox } from "~/components/Main/Nav/StyledNav";

export const StyledNavHeader = styled(StyledNavBox)`
    & > :first-child > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;