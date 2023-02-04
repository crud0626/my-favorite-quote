import React from "react";
import SVGIconBtn from "~/components/common/SVGIconBtn/SVGIconBtn";
import { ContentBoxWrapper } from "./ContentBox.styles";
import * as sizes from "~/styles/common/sizes";
import * as colors from "~/styles/common/colors";
import { IQuoteContent } from "~/types/quote.type";
import { EmptyHeartIcon, FillHeartIcon } from "~/assets";

interface IProps {
  content: IQuoteContent;
  onClickNavContent(target: IQuoteContent): void;
  onChangeFavorite(target: IQuoteContent): void;
}

const ContentBox = ({ content, onClickNavContent, onChangeFavorite }: IProps) => {
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
