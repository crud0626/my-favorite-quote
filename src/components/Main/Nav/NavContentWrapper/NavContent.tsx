import React from 'react';
import SVGIconBtn from '~/components/SVGIconBtn/SVGIconBtn';
import { StyledNavContent, NavFavoriteButton } from './StyledNavContent';
import * as sizes from '~/styles/common/sizes';
import * as colors from '~/styles/common/colors';
import { IQuoteData } from '~/types/interface';
import { EmptyHeartIcon, FillHeartIcon } from '~/assets';

interface IProps {
    content: IQuoteData;
    className: string;
    onClickNavContent(target: IQuoteData): void;
    onChangeFavorite(target: IQuoteData): void;
}

const NavContent = ({ content, className, onClickNavContent, onChangeFavorite }: IProps) => {
    const onClickHeart = (event: React.MouseEvent) => {
        event.stopPropagation();
        onChangeFavorite(content);
    }

    return (
        <StyledNavContent className={className} onClick={() => onClickNavContent(content)}>
            <div className='text_wrapper'>
                <span>{content.quote}</span>
                <span>{content.author}</span>
            </div>
            <NavFavoriteButton onClick={onClickHeart}>
                <SVGIconBtn 
                    src={content.favorite ? <FillHeartIcon /> : <EmptyHeartIcon />}
                    color={content.favorite ? colors.BUTTON_RED : colors.MAIN_BLACK}
                    size={sizes.SMALL_ICON_SIZE}
                    hoverColor={colors.ICON_HOVER_COLOR}
                />
            </NavFavoriteButton>
        </StyledNavContent>
    );
};

export default NavContent;