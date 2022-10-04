import React, { useCallback, useState } from 'react';
import NavContent from '~/components/Main/Nav/NavContentWrapper/NavContent';
import NoContents from '~/components/Main/Nav/NavContentWrapper/NoContents';
import Icon from '~/components/Icon/Icon';
import * as colors from '~/styles/common/colors';
import { IQuoteData } from '~/types/interface';
import { BOTTOM_CHEVRON_ICON } from '~/styles/common/iconPath';
import { ContentController, NavBodyButton, StyledNavContentWrapper } from '~/styles/Main/Nav/NavContentWrapper/StyledNavContentWrapper';

export interface ContentProps {
    title: "History" | "Favorite";
    contents: IQuoteData[];
    onClickNavContent(target: IQuoteData): void;
    onChangeFavorite(target: IQuoteData): void;
}

const NavContentWrapper = ({ title, contents, onClickNavContent, onChangeFavorite }: ContentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleContent = useCallback(() => 
        setIsOpen((prevState) => !prevState)
    , []);

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
            <ContentController as={"li"} onClick={handleContent}>
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