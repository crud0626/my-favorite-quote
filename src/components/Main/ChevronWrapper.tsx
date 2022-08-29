import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { StyledButton } from '../../styles/StyledButton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ChevronProps {
    direction: "left" | "right";
}

const StyledChevronWrapper = styled.div`
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;

    & .inner_btn_wrapper {
        top: 10px;
        right: 10px;
        position: absolute;
    }
`;

const ChevronButton = styled(StyledButton)<ChevronProps>`
    padding: ${sizes.SMALL_SPACE_SIZE};
    width: ${sizes.CHEVRON_CONTAINER_SIZE};
    height: ${sizes.CHEVRON_CONTAINER_SIZE};
    border-radius: 3px;
    transform: translateX(${props => props.direction === "left" ? "-200%" : "200%" });

    &:hover {
        background-color: ${colors.CHEVRON_BG_HOVER};
    }

    &:active {
        background-color: ${colors.CHEVRON_BG_ACTIVE};
    }
`;

const ChevronWrapper = () => {
    return (
        <StyledChevronWrapper>
            <ChevronButton direction={"left"}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"right"}>
                <FontAwesomeIcon icon={faChevronRight} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;