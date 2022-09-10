import React, { useState } from 'react';
import NavContent from '~/components/Main/Nav/NavContent';
import NoContents from '~/components/Main/Nav/NoContents';
import Icon from '~/components/Icon/Icon';
import { QuoteData } from '~/App';
import * as colors from '~/styles/common/colors';
import { BOTTOM_CHEVRON_ICON } from '~/styles/common/iconPath';
import { ContentController, NavBodyButton, StyledNavContentWrapper } from '~/styles/Nav/StyledNavContentWrapper';

export interface ContentProps {
    title: "History" | "Favorite";
    contents: QuoteData[];
    isLoggedIn?: boolean;
    onClickNavContent(target: QuoteData): void;
    onChangeFavorite(target: QuoteData): void;
}

const NavContentWrapper = ({ title, contents, isLoggedIn, onClickNavContent, onChangeFavorite }: ContentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleContent = () => setIsOpen(state => !state);

    const contentsElement = contents.map((content) =>
        <NavContent 
            key={content.id}
            className={"content"}
            onClickNavContent={onClickNavContent}
            onChangeFavorite={onChangeFavorite}
            content={content}
        />
    );

    return (
        <StyledNavContentWrapper>
            <ContentController onClick={handleContent}>
                <NavBodyButton isOpen={isOpen}>
                    <Icon 
                        define={BOTTOM_CHEVRON_ICON}
                        color={colors.MAIN_BLACK}
                    />
                </NavBodyButton>
                <span>{title}</span>
            </ContentController>
            {isOpen && (contents.length === 0 ? <NoContents /> : contentsElement )}
        </StyledNavContentWrapper>
    );
};

export default NavContentWrapper;