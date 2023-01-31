import React, { useCallback, useState } from 'react';
import NavContent from '~/components/Main/Nav/NavContentWrapper/NavContent';
import NoContents from '~/components/Main/Nav/NavContentWrapper/NoContents';
import * as colors from '~/styles/common/colors';
import { IQuoteData } from '~/types/interface';
import { 
    StyledNavContentWrapper, 
    ContentController, 
    NavBodyButton 
} from './StyledNavContentWrapper';
import { BottomChevron } from '~/assets';


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
                    <BottomChevron color={colors.MAIN_BLACK} />
                </NavBodyButton>
                <span>{title}</span>
            </ContentController>
            {isOpen && (contents.length === 0 ? <NoContents /> : contentsElement )}
        </StyledNavContentWrapper>
    );
};

export default NavContentWrapper;