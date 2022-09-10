import React from 'react';
import Icon from '../Icon/Icon';
import { ChevronEventTypes } from './Section/Section';
import * as colors from '../../styles/common/colors';
import { LEFT_CHEVRON_ICON, RIGHT_CHEVRON_ICON } from "../../styles/common/iconPath";
import { ChevronButton, StyledChevronWrapper } from '../../styles/StyledChevronWrapper';

interface IChevronWrapper {
    handleCardFilp(direction: ChevronEventTypes): void;
}

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