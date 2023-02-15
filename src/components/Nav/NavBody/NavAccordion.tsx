import React, { useCallback, useState } from 'react';
import ContentBox from './ContentBox';
import * as colors from '~/styles/common/colors';
import { AccordionTitle, NavBodyButton, TextBox } from './NavAccordion.styles';
import { IQuoteContent, QuotesGroupType } from '~/types/quote.type';
import { capitalizeFirst } from '~/utils/capitalizeFirst';
import { BottomChevron } from '~/assets';

export interface ContentProps {
    titleName: QuotesGroupType;
    contents: IQuoteContent[];
}

const NavContentWrapper = ({ contents }: Pick<ContentProps, 'contents'>) => {
    return (
        <ul>
            {
                contents.length === 0
                ? <TextBox>{"No Contents"}</TextBox>  
                : contents.map(content => (
                    <ContentBox 
                        key={content.id}
                        content={content}
                    />
                ))
            }
        </ul>
    );
}

const NavAccordion = ({ titleName, contents }: ContentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleContent = useCallback(() => 
        setIsOpen((prevState) => !prevState)
    , []);

    return (
        <>
            <AccordionTitle as={"li"} onClick={handleContent}>
                <NavBodyButton isOpen={isOpen}>
                    <BottomChevron color={colors.MAIN_BLACK} />
                </NavBodyButton>
                <span>{capitalizeFirst(titleName)}</span>
            </AccordionTitle>
            { isOpen && <NavContentWrapper contents={contents} /> }
        </>
    );
};

export default NavAccordion;