import React from 'react';
import { ChevronButton, StyledChevronWrapper } from './StyledChevronWrapper';
import * as colors from '~/styles/common/colors';
import { debounce } from '~/utils/debounce';
import { LeftChevron, RightChevron } from '~/assets';

interface IChevronWrapper {
    requestData(id?: string): Promise<any>;
}

const ChevronWrapper = ({ requestData }: IChevronWrapper) => {
    const onClick = debounce(requestData, 300);

    return (
        <StyledChevronWrapper>
            <ChevronButton direction={"prev"} data-role="prev" onClick={() => onClick()}>
                <LeftChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => onClick()}>
                <RightChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
        </StyledChevronWrapper>
    );
};

export default ChevronWrapper;