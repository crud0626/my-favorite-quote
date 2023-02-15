import React, { useCallback } from 'react';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useCardStore } from '~/stores/useCardStore';
import * as colors from '~/styles/common/colors';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import { debounce } from '~/utils/debounce';
import { ChevronEventType } from '~/types/user.type';
import { LeftChevron, RightChevron } from '~/assets';

const ChevronBox = () => {
    const { changeDisplayQuote} = useCardStore();
    const { requestQuote } = useQuotesStore();

    const fetchNewQuote = useCallback((direction: ChevronEventType) => {
        requestQuote()
        .then(newQuote => {
            if (!newQuote) return;

            changeDisplayQuote(newQuote, direction);
        });
    }, []);
    
    const onClick = useCallback(debounce(fetchNewQuote, 300, true), [fetchNewQuote]);

    return (
        <ChevronWrapper>
            <ChevronButton direction={"prev"} onClick={() => onClick("prev")}>
                <LeftChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"next"} onClick={() => onClick("next")}>
                <RightChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
        </ChevronWrapper>
    );
};

export default ChevronBox;