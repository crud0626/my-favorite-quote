import React from 'react';
import Icon from '~/components/Icon/Icon';
import { QuoteData } from '~/types/interface';
import * as colors from '~/styles/common/colors';
import { EMPTY_HEART_ICON, FILL_HEART_ICON } from '~/styles/common/iconPath';
import { NavFavoriteButton, StyledNavContent } from '~/styles/Nav/StyledNavContent';

interface IProps {
    content: QuoteData;
    className: string;
    onClickNavContent(target: QuoteData): void;
    onChangeFavorite(target: QuoteData): void;
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
                {
                    content.favorite
                    ? <Icon define={FILL_HEART_ICON} color={colors.BUTTON_RED} isHoverColor={true} />
                    : <Icon define={EMPTY_HEART_ICON} color={colors.MAIN_BLACK} isHoverColor={true} />
                }
                
            </NavFavoriteButton>
        </StyledNavContent>
    );
};

export default NavContent;