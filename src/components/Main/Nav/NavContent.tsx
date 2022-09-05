import React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon/Icon';
import { QuoteData } from '../../../services/quotesApi';
import * as sizes from '../../../styles/common/sizes';
import * as colors from '../../../styles/common/colors';
import { EMPTY_HEART_ICON } from '../../../styles/common/iconPath';
import { StyledButton } from '../../../styles/StyledButton';
import { navBoxMixin } from '../../../styles/navBoxMixin';

interface IProps extends QuoteData {
    className: string;
    requestData(id?: string): Promise<any>;
}

const StyledContent = styled.div`
    ${navBoxMixin}
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BUTTON_HOVER};
    }

    &:active {
        background-color: ${colors.BUTTON_ACTIVE};
    }
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

const NavContent = ({ id, quote, author, className, requestData }: IProps) => {
    return (
        <StyledContent className={className} onClick={() => requestData(id)}>
            <SpanWrapper>
                <span>{quote}</span>
                <span>{author}</span>
            </SpanWrapper>
            <FavoriteButton>
                <Icon 
                    define={EMPTY_HEART_ICON}
                    color={colors.MAIN_BLACK}
                    isHoverColor={true}
                />
            </FavoriteButton>
        </StyledContent>
    );
};

export default NavContent;