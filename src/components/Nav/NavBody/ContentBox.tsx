import React from "react";
import SVGIconBtn from "~/components/common/SVGIconBtn/SVGIconBtn";
import { ContentBoxWrapper } from "./ContentBox.styles";
import * as sizes from "~/styles/common/sizes";
import * as colors from "~/styles/common/colors";
import { IQuoteContent } from "~/types/quote.type";
import { EmptyHeartIcon, FillHeartIcon } from "~/assets";
import { useCardStore } from "~/stores/useCardStore";
import { useUserStore } from "~/stores/useUserStore";
import { ChevronEventType } from "~/types/user.type";

interface IProps {
  content: IQuoteContent;
  handleCardFilp(direction: ChevronEventType): void;
  onChangeFavorite(target: IQuoteContent): void;
}

const ContentBox = ({ content, handleCardFilp, onChangeFavorite }: IProps) => {
  const { displayQuotes, cardPosition, changeDisplayQuote, changeCardPosition } = useCardStore();
  const { updateHistory } = useUserStore();
  const onClickNavContent = (targetQuote: IQuoteContent): void => {
    if(displayQuotes[cardPosition]?.id === targetQuote.id) return;

    changeDisplayQuote(targetQuote, cardPosition);
    changeCardPosition();
    updateHistory(targetQuote);
    handleCardFilp('next');
  }

  const onClickHeart = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChangeFavorite(content);
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
