import React, { useCallback } from 'react';
import { downloadToImg } from '~/services/html2canvas';
import { useCardStore } from '~/stores/useCardStore';
import { useUserStore } from '~/stores/useUserStore';
import { useQuotesStore } from '~/stores/useQuotesStore';
import SVGIconBtn from '~/components/common/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { InnerBtnWrapper, StyledCard, StyledCardProps } from './Card.styles';
import { IQuoteContent } from '~/types/quote.type';
import { saveUserData } from '~/utils/saveUserData';
import { DownloadIcon, EmptyHeartIcon, FillHeartIcon } from '~/assets';

interface IProps extends Pick<StyledCardProps, 'position'> {}

const Card = ({ position }: IProps) => {
    const { cardPosition, displayQuotes, replaceDisplayQuotes } = useCardStore();
    const { userInfo } = useUserStore();
    const { onChangeFavorite } = useQuotesStore();

    const onChange = (target: IQuoteContent) => {
        const { newUserQuotes, willChangeQuote } = onChangeFavorite(target);

        replaceDisplayQuotes(willChangeQuote);
        saveUserData(newUserQuotes, userInfo?.uid);
    };

    const onDownload = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement>) => {
        if(currentTarget instanceof HTMLElement) {
            const wrapperElem = currentTarget.closest('.card_wrapper');
            if (wrapperElem instanceof HTMLElement) downloadToImg(wrapperElem);
        }
    }, []);

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
                            onClick={() => onChange(quoteContent)}
                        />
                        {/* 다운로드 버튼 */}
                        <SVGIconBtn 
                            src={<DownloadIcon />}
                            size={sizes.SMALL_ICON_SIZE}
                            color={colors.MAIN_WHITE}
                            hoverColor={colors.ICON_HOVER_COLOR}
                            onClick={onDownload}
                        />
                    </InnerBtnWrapper>
                </>
            }
        </StyledCard>
    );
};

export default Card;