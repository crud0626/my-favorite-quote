import styled from "styled-components";
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';

export const StyledMain = styled.main`
    position: relative;
    width: 100%;
    height: calc(${sizes.SECTION_HEIGHT});
    background-color: ${colors.MAIN_BLACK};
`;