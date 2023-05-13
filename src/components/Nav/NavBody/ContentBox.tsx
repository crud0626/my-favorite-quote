import React from 'react';
import { SVGIconBtn } from '~/components/common';
import { ContentBoxWrapper } from './ContentBox.styles';
import { useCardStore, useQuotesStore, useUserStore } from '~/hooks/stores';
import { colors, sizes } from '~/styles/common';
import { IQuoteContent } from '~/types/quote.type';
import { saveUserData } from '~/utils';
import { EmptyHeartIcon, FillHeartIcon } from '~/assets/icons';

interface IProps {
  content: IQuoteContent;
}

const ContentBox = ({ content }: IProps) => {
  const { displayQuotes, cardPosition, changeDisplayQuote, replaceDisplayQuotes } = useCardStore();
  const { onChangeFavorite, updateQuotes } = useQuotesStore();
  const { userInfo } = useUserStore();

  const onClickNavContent = (targetQuote: IQuoteContent): void => {
    if(displayQuotes[cardPosition]?.id === targetQuote.id) return;

    changeDisplayQuote(targetQuote);
    const newQuotesList = updateQuotes(targetQuote, 'history');
    saveUserData(newQuotesList, userInfo?.uid);
  }
  
  const onClickHeart = (e: React.MouseEvent, target: IQuoteContent) => {
    e.stopPropagation();

    const { newUserQuotes, targetQuote } = onChangeFavorite(target);

    replaceDisplayQuotes(targetQuote);
    saveUserData(newUserQuotes, userInfo?.uid);
  };
  
  return (
    <ContentBoxWrapper onClick={() => onClickNavContent(content)}>
      <div className="text_wrapper">
        <span>{content.quote}</span>
        <span>{content.author}</span>
      </div>
      <div className="btn_wrapper">
        <SVGIconBtn
          src={content.favorite ? <FillHeartIcon /> : <EmptyHeartIcon />}
          color={content.favorite ? colors.BUTTON_RED : colors.MAIN_BLACK}
          size={sizes.SMALL_ICON_SIZE}
          hoverColor={colors.ICON_HOVER_COLOR}
          onClick={(e) => onClickHeart(e, content)}
        />
      </div>
    </ContentBoxWrapper>
  );
};

export default ContentBox;
