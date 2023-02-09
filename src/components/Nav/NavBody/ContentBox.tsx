import React from "react";
import SVGIconBtn from "~/components/common/SVGIconBtn/SVGIconBtn";
import { ContentBoxWrapper } from "./ContentBox.styles";
import * as sizes from "~/styles/common/sizes";
import * as colors from "~/styles/common/colors";
import { IQuoteContent } from "~/types/quote.type";
import { useCardStore } from "~/stores/useCardStore";
import { useUserStore } from "~/stores/useUserStore";
import { saveUserData } from "~/utils/saveUserData";
import { EmptyHeartIcon, FillHeartIcon } from "~/assets";

interface IProps {
  content: IQuoteContent;
}

const ContentBox = ({ content }: IProps) => {
  const { displayQuotes, cardPosition, changeDisplayQuote, changeCardPosition, handleCardFlip, updateDisplayQuotes } = useCardStore();
  const { userInfo, onChangeFavorite, updateHistory } = useUserStore();

  const onClickNavContent = (targetQuote: IQuoteContent): void => {
    if(displayQuotes[cardPosition]?.id === targetQuote.id) return;

    changeDisplayQuote(targetQuote, cardPosition);
    changeCardPosition();
    updateHistory(targetQuote);
    handleCardFlip();
  }
  
  // 훅으로 뺼 예정
  const onChange = (target: IQuoteContent) => {
      const { newUserQuotes, willChangeQuote } = onChangeFavorite(target);
  
      const cardPosition = displayQuotes.front?.id === willChangeQuote.id 
      ? "front" : displayQuotes.back?.id === willChangeQuote.id 
      ? "back" : null;
      
      if(cardPosition) {
          const newQuoteData = { ...displayQuotes };
          newQuoteData[cardPosition] = willChangeQuote

          updateDisplayQuotes(newQuoteData);
      }

      saveUserData(newUserQuotes, userInfo?.uid);
  };

  const onClickHeart = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(content);
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
          onClick={onClickHeart}
        />
      </div>
    </ContentBoxWrapper>
  );
};

export default ContentBox;
