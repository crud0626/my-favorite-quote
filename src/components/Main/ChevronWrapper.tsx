import React, { useCallback } from 'react';
import Icon from '~/components/Icon/Icon';
import { ChevronEventType } from '~/types/type';
import * as colors from '~/styles/common/colors';
import { LEFT_CHEVRON_ICON, RIGHT_CHEVRON_ICON } from "~/styles/common/iconPath";
import { ChevronButton, StyledChevronWrapper } from '~/styles/Section/StyledChevronWrapper';
import { debounce } from '~/utils/debounce';

interface IChevronWrapper {
    handleCardFilp(direction: ChevronEventType): void;
}

const ChevronWrapper = ({ handleCardFilp }: IChevronWrapper) => {
    const onClick = debounce(handleCardFilp, 300);

    return (
        <StyledChevronWrapper>
            <ChevronButton direction={"prev"} data-role="prev" onClick={() => onClick("prev")}>
                <Icon 
                    define={LEFT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => onClick("next")}>
                <Icon 
                    define={RIGHT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;