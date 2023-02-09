import React, { useCallback } from 'react';
import { useUserStore } from '~/stores/useUserStore';
import { useCardStore } from '~/stores/useCardStore';
import { ChevronButton, ChevronWrapper } from './ChevronBox.styles';
import * as colors from '~/styles/common/colors';
import { debounce } from '~/utils/debounce';
import { LeftChevron, RightChevron } from '~/assets';

const ChevronBox = () => {
    const { cardPosition, changeCardPosition, handleCardFlip, changeDisplayQuote} = useCardStore();
    const { requestRandomQuote } = useUserStore();

    const fetchNewQuote = () => {
        requestRandomQuote()
        .then(newQuote => {
            if (!newQuote) return;

            changeCardPosition();
            changeDisplayQuote(newQuote, cardPosition);
            handleCardFlip();
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