import React, { useCallback, useState } from 'react';
import ContentBox from './ContentBox';
import * as colors from '~/styles/common/colors';
import { AccordionTitle, NavBodyButton, TextBox } from './NavAccordion.styles';
import { IQuoteContent, QuotesGroupType } from '~/types/quote.type';
import { BottomChevron } from '~/assets';

export interface ContentProps {
    titleName: QuotesGroupType;
    contents: IQuoteContent[];
    onClickNavContent(target: IQuoteContent): void;
    onChangeFavorite(target: IQuoteContent): void;
}

const NavContentWrapper = ({ contents, onClickNavContent, onChangeFavorite }: Omit<ContentProps, 'titleName'>) => {
    return (
        <>
            {contents.map(content => (
                <ContentBox 
                    key={content.id}
                    content={content}
                    onClickNavContent={onClickNavContent}
                    onChangeFavorite={onChangeFavorite}
                />
            ))
            }
        </>
    );
}

const NavAccordion = ({ titleName, contents, onClickNavContent, onChangeFavorite }: ContentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toCapitalizeFirst = useCallback((str: string): string => {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }, []);

    const handleContent = useCallback(() => 
        setIsOpen((prevState) => !prevState)
    , []);

    return (
        <>
            <AccordionTitle as={"li"} onClick={handleContent}>
                <NavBodyButton isOpen={isOpen}>
                    <BottomChevron color={colors.MAIN_BLACK} />
                </NavBodyButton>
                <span>{toCapitalizeFirst(titleName)}</span>
            </AccordionTitle>
            <ul>
                {isOpen && (
                    contents.length === 0 
                    ? <TextBox>{"No Contents"}</TextBox> 
                    : <NavContentWrapper { ...{ contents, onClickNavContent, onChangeFavorite } } />
                )}
            </ul>
        </>
    );
};

export default NavAccordion;