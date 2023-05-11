import React, { useCallback, useMemo } from 'react';
import { useCardStore } from '~/hooks/stores/useCardStore';
import { useUserStore } from '~/hooks/stores/useUserStore';
import { useQuotesStore } from '~/hooks/stores/useQuotesStore';
import SVGIconBtn from '~/components/common/SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { InnerBtnWrapper, StyledCard, StyledCardProps } from './Card.styles';
import { IQuoteContent } from '~/types/quote.type';
import { saveUserData } from '~/utils/saveUserData';
import { downloadImage } from '~/utils/downloadImage';
import { DownloadIcon, EmptyHeartIcon, FillHeartIcon } from '~/assets/icons';
import * as CARD_IMAGES from '~/assets/card_images';

const Card = ({ position }: Pick<StyledCardProps, 'position'>) => {
    const { cardPosition, displayQuotes, replaceDisplayQuotes } = useCardStore();
    const { userInfo } = useUserStore();
    const { onChangeFavorite } = useQuotesStore();

    const getRandomImage = (cardImages: { [key: string]: string }): string => {
        const avilableImages = { ...cardImages };
    
        if ('DEFAULT' in avilableImages) delete avilableImages.DEFAULT;

        const imageNames = Object.keys(avilableImages);
        const randomIndex = Math.floor(Math.random() * imageNames.length);
        const targetImage = imageNames[randomIndex];
        
        return avilableImages[targetImage];
    }

    const onChange = (target: IQuoteContent) => {
        const { newUserQuotes, targetQuote } = onChangeFavorite(target);

        replaceDisplayQuotes(targetQuote);
        saveUserData(newUserQuotes, userInfo?.uid);
    };

    const onDownload = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement>) => {
        if(currentTarget instanceof HTMLElement) {
            const wrapperElem = currentTarget.closest('.card_wrapper');
            if (wrapperElem instanceof HTMLElement) downloadImage(wrapperElem);
        }
    }, []);

    const quoteContent = displayQuotes[position];
    const cardImage = useMemo(() => getRandomImage(CARD_IMAGES), [quoteContent]);

    return (
        <StyledCard {...{ position, cardPosition, cardImage }}>
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
                            aria-label={`${quoteContent?.favorite ? 'cancel' : 'add' } favorite`}
                            onClick={() => onChange(quoteContent)}
                        />
                        {/* 다운로드 버튼 */}
                        <SVGIconBtn 
                            src={<DownloadIcon />}
                            size={sizes.SMALL_ICON_SIZE}
                            color={colors.MAIN_WHITE}
                            hoverColor={colors.ICON_HOVER_COLOR}
                            aria-label={'download image'}
                            onClick={onDownload}
                        />
                    </InnerBtnWrapper>
                </>
            }
        </StyledCard>
    );
};

export default Card;