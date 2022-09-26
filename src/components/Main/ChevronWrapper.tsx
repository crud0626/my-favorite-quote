import React from 'react';
import Icon from '~/components/Icon/Icon';
import * as colors from '~/styles/common/colors';
import { LEFT_CHEVRON_ICON, RIGHT_CHEVRON_ICON } from "~/styles/common/iconPath";
import { ChevronButton, StyledChevronWrapper } from '~/styles/Main/Section/StyledChevronWrapper';
import { debounce } from '~/utils/debounce';

interface IChevronWrapper {
    requestData(id?: string): Promise<any>;
}

const ChevronWrapper = ({ requestData }: IChevronWrapper) => {
    const onClick = debounce(requestData, 300);

    return (
        <StyledChevronWrapper>
            <ChevronButton direction={"prev"} data-role="prev" onClick={() => onClick()}>
                <Icon 
                    define={LEFT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => onClick()}>
                <Icon 
                    define={RIGHT_CHEVRON_ICON}
                    color={colors.MAIN_WHITE}
                />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;