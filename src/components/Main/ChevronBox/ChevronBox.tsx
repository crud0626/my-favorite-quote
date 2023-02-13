import React, { useCallback } from 'react';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useCardStore } from '~/stores/useCardStore';
import * as colors from '~/styles/common/colors';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import { debounce } from '~/utils/debounce';
import { LeftChevron, RightChevron } from '~/assets';

const ChevronBox = () => {
    const { changeDisplayQuote} = useCardStore();
    const { requestQuote } = useQuotesStore();

    const fetchNewQuote = () => {
        requestQuote()
        .then(newQuote => {
            if (!newQuote) return;

            changeDisplayQuote(newQuote);
        })
    }
    const onClick = useCallback(debounce(fetchNewQuote, 300, true), []);

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