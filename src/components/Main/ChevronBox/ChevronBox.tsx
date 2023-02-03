import React, { useCallback } from 'react';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import * as colors from '~/styles/common/colors';
import { debounce } from '~/utils/debounce';
import { LeftChevron, RightChevron } from '~/assets';

interface IChevronWrapper {
    requestData(id?: string): Promise<any>;
}

const ChevronBox = ({ requestData }: IChevronWrapper) => {
    const onClick = useCallback(debounce(requestData, 300, true), []);

    return (
        <ChevronWrapper>
            <ChevronButton direction={"prev"} data-role="prev" onClick={() => onClick()}>
                <LeftChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"next"} data-role="next" onClick={() => onClick()}>
                <RightChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
        </ChevronWrapper>
    );
};

export default ChevronBox;