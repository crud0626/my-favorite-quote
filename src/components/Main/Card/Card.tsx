import React from 'react';
import SVGIconBtn from '~/components/common/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { InnerBtnWrapper, StyledCard, StyledCardProps } from './Card.styles';
import { IQuoteContent } from '~/types/quote.type';
import { DownloadIcon, EmptyHeartIcon, FillHeartIcon } from '~/assets';
import { useCardStore } from '~/stores/useCardStore';

interface IProps extends Pick<StyledCardProps, 'position'> {
    onDownload(): void;
    onChangeFavorite(target: IQuoteContent): void;
}

const Card = ({ position, onDownload, onChangeFavorite }: IProps) => {
    const { cardPosition, displayQuotes } = useCardStore();
    const quoteContent = displayQuotes[position];

    return (
        <StyledCard position={position} cardPosition={cardPosition}>
            {quoteContent &&
                <>
                    <div data-id={quoteContent.id} className='card_content'>
                        <span className='quote'>{quoteContent.quote}</span>
                        <span className='author'>{quoteContent.author}</span>
                    </div>
                    <InnerBtnWrapper className='inner_btn_wrapper'>
                        {/* 즐겨찾기 버튼 */}
                        <SVGIconBtn
                            src={quoteContent?.favorite ? <FillHeartIcon /> : <EmptyHeartIcon />}
                            size={sizes.SMALL_ICON_SIZE}
                            color={quoteContent?.favorite ? colors.BUTTON_RED : colors.MAIN_WHITE}
                            hoverColor={colors.ICON_HOVER_COLOR}
                            onClick={() => onChangeFavorite(quoteContent)}
                        />
                        {/* 다운로드 버튼 */}
                        <SVGIconBtn 
                            src={<DownloadIcon />}
                            size={sizes.SMALL_ICON_SIZE}
                            color={colors.MAIN_WHITE}
                            hoverColor={colors.ICON_HOVER_COLOR}
                            onClick={() => onDownload()}
                        />
                    </InnerBtnWrapper>
                </>
            }
        </StyledCard>
    );
};

export default Card;