import React from 'react';
import styled from 'styled-components';
import * as sizes from '../../../styles/common/sizes';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from '../../../styles/StyledButton';
import { IQuotes } from './NavBody';
import { navBoxMixin } from '../../../styles/navBoxMixin';

interface IProps extends IQuotes {
    className: string;
}

const StyledContent = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SpanWrapper = styled.div`
    & > span {
        display: block;

        &:first-child {
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        &:last-child {
            font-size: ${sizes.SUB_FONT_SIZE};

            &::before {
                content: "- ";
            }
        }
    }
`;

const FavoriteButton = styled(StyledButton)`
    margin-left: ${sizes.SPACE_2X};
    flex-shrink: 0;
`;

const NavContent = ({ quote, author, favorite, className }: IProps) => {
    return (
        <StyledContent className={className}>
            <SpanWrapper>
                <span>{quote}</span>
                <span>{author}</span>
            </SpanWrapper>
            <FavoriteButton>
                <FontAwesomeIcon 
                    icon={favorite ? faRegularHeart : faSolidHeart}
                    style={{ width: "100%", height: "100%" }}
                />
            </FavoriteButton>
        </StyledContent>
    );
};

export default NavContent;