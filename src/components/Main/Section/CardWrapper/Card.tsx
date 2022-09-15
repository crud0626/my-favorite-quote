import React from 'react';
import styled from 'styled-components';
import Icon from '~/components/Icon/Icon';
import { IQuoteData } from '~/types/interface';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledButton } from '~/styles/common/StyledButton';
import { DOWNLOAD_ICON, EMPTY_HEART_ICON, FILL_HEART_ICON } from '~/styles/common/iconPath';
import { StyledCard, StyledCardProps } from '~/styles/Section/Card/StyledCard';

interface RenderProps extends StyledCardProps {
    quoteData: IQuoteData | null;
    onDownload(): void;
    onChangeFavorite(target: IQuoteData): void;
}

const InnerBtnWrapper = styled.div`
    top: ${sizes.SPACE_5X};
    right: ${sizes.SPACE_5X};
    position: absolute;
    z-index: 1;

    & :not(:first-child) {
        margin-left: ${sizes.SPACE_2X};
    }
`;

const Card = ({ position, exposedCard, quoteData, onDownload, onChangeFavorite }: RenderProps) => {
    return (
        <StyledCard position={position} exposedCard={exposedCard}>
            {quoteData &&
                <>
                    <div data-id={quoteData.id} className='card_content'>
                        <span className='quote'>{quoteData.quote}</span>
                        <span className='author'>{quoteData.author}</span>
                    </div>
                    <InnerBtnWrapper className='inner_btn_wrapper'>
                        <StyledButton size={sizes.SMALL_ICON_SIZE} onClick={() => onChangeFavorite(quoteData)}>
                            {
                                quoteData?.favorite
                                ? <Icon define={FILL_HEART_ICON} color={colors.BUTTON_RED} isHoverColor={true} />
                                : <Icon define={EMPTY_HEART_ICON} color={colors.MAIN_WHITE} isHoverColor={true} />
                            }
                        </StyledButton>
                        <StyledButton size={sizes.SMALL_ICON_SIZE} onClick={() => onDownload()}>
                            <Icon 
                                define={DOWNLOAD_ICON}
                                color={colors.MAIN_WHITE}
                                isHoverColor={true}
                            />
                        </StyledButton>
                    </InnerBtnWrapper>
                </>
            }
        </StyledCard>
    );
};

export default Card;