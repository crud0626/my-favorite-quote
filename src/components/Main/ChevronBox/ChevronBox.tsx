import React, { useCallback } from 'react';
import { colors } from '~/styles/common';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import { useTouchSlide } from '~/hooks/customs';
import { useCardStore, useQuotesStore, useUserStore } from '~/hooks/stores';
import { debounce, saveUserData } from '~/utils';
import { ChevronEventType } from '~/types/user.type';
import { LeftChevron, RightChevron } from '~/assets/icons';

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

    const [setTouchStart, setTouchEnd] = useTouchSlide(() => 
        onClick('next', userInfo?.uid), 'horizontal'
    );

    return (
        <ChevronWrapper 
            onTouchStart={setTouchStart} 
            onTouchEnd={setTouchEnd}
        >
            <ChevronButton 
                direction={"prev"} 
                aria-label={"turn left"}
                onClick={() => onClick("prev", userInfo?.uid)}
            >
                <LeftChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
            <ChevronButton 
                direction={"next"} 
                aria-label={"turn right"}
                onClick={() => onClick("next", userInfo?.uid)}
            >
                <RightChevron fill={colors.MAIN_WHITE} />
            </ChevronButton>
        </ChevronWrapper>
    );
};

export default ChevronBox;