import React, { useCallback } from 'react';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useCardStore } from '~/stores/useCardStore';
import { useUserStore } from '~/stores/useUserStore';
import * as colors from '~/styles/common/colors';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import { debounce } from '~/utils/debounce';
import { ChevronEventType } from '~/types/user.type';
import { LeftChevron, RightChevron } from '~/assets/icons';
import { saveUserData } from '~/utils/saveUserData';

const ChevronBox = () => {
    const { changeDisplayQuote} = useCardStore();
    const { userInfo } = useUserStore();
    const { requestQuote } = useQuotesStore();

    const fetchNewQuote = useCallback((direction: ChevronEventType, userId?: string) => {
        requestQuote()
        .then((res) => {
            if (!res) return;
            
            const { newQuote, newQuotesList } = res;

            changeDisplayQuote(newQuote, direction);
            saveUserData(newQuotesList, userId);
        });
    }, []);
    
    const onClick = useCallback(debounce(fetchNewQuote, 300, true), [fetchNewQuote]);

    return (
        <ChevronWrapper>
            <ChevronButton direction={"prev"} onClick={() => onClick("prev", userInfo?.uid)}>
                <LeftChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton direction={"next"} onClick={() => onClick("next", userInfo?.uid)}>
                <RightChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
        </ChevronWrapper>
    );
};

export default ChevronBox;