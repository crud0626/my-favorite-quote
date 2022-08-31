import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { StyledButton } from '../../styles/StyledButton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronEventTypes } from './Section/Section';

interface StyledProps {
    direction: ChevronEventTypes;
}

interface IChevronWrapper {
    handleCardFilp(direction: ChevronEventTypes): void;
}

const StyledChevronWrapper = styled.div`
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 0px;
    background-color: transparent;

    /* 삭제해야함. */
    & .inner_btn_wrapper {
        top: 10px;
        right: 10px;
        position: absolute;
    }
`;

const ChevronButton = styled(StyledButton)<StyledProps>`
    padding: ${sizes.SPACE_2X};
    width: ${sizes.CHEVRON_CONTAINER_SIZE};
    height: ${sizes.CHEVRON_CONTAINER_SIZE};
    border-radius: 3px;
    transform: translateX(${props => props.direction === "prev" ? "-200%" : "200%" });

    &:hover {
        background-color: ${colors.CHEVRON_BG_HOVER};
    }

    &:active {
        background-color: ${colors.CHEVRON_BG_ACTIVE};
    }
`;

const ChevronWrapper = ({ handleCardFilp }: IChevronWrapper) => {
    return (
        <StyledChevronWrapper>
            <ChevronButton direction={"prev"} data-role="prev" onClick={() => handleCardFilp("prev")}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => handleCardFilp("next")}>
                <FontAwesomeIcon icon={faChevronRight} style={{ width: "100%", height: "100%" }} color={colors.MAIN_WHITE} />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;