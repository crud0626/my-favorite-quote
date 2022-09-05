import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { ChevronEventTypes } from './Section/Section';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { StyledButton } from '../../styles/StyledButton';
import { LEFT_CHEVRON_ICON, RIGHT_CHEVRON_ICON } from "../../styles/common/iconPath";

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
                <Icon 
                    define={LEFT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => handleCardFilp("next")}>
                <Icon 
                    define={RIGHT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;