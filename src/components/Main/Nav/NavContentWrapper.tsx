import React, { useState } from 'react';
import styled from 'styled-components';
import NavContent from './NavContent';
import NoContents from './NoContents';
import Icon from '../../Icon/Icon';
import { QuoteData } from '../../../services/quotesApi';
import * as colors from '../../../styles/common/colors';
import * as sizes from '../../../styles/common/sizes';
import { StyledButton } from '../../../styles/StyledButton';
import { NavBoxWrapper } from '../../../styles/NavBoxWrapper';
import { BOTTOM_CHEVRON_ICON } from '../../../styles/common/iconPath';

interface ButtonProps {
    isOpen: boolean;
}

export interface ContentProps {
    title: "History" | "Favorite";
    contents: QuoteData[];
    isLoggedIn?: boolean;
    requestData(id?: string): Promise<any>;
}

const StyledContainer = styled.div`
    min-height: 70px;
    height: auto;
    border-top: 1px solid ${colors.LIGHT_GRAY};

    &:last-child {
        border-bottom: 1px solid ${colors.LIGHT_GRAY};
    }
    
    & > :nth-child(2) {
        border-top: 1px solid ${colors.LIGHT_GRAY};
    }
`;

const StyledContentWrapper = styled(NavBoxWrapper)`
    justify-content: flex-start;
    cursor: pointer;

    & > :first-child {
        margin-right: ${sizes.SPACE_2X};
    }
`;

const NavBodyButton = styled(StyledButton)<ButtonProps>`
    transition: all 0.3s ease-in-out;
    transform: ${props => props.isOpen ? "rotate(-180deg)" : "rotate(0deg)" };
    transform-origin: center;
`;

const NavContentWrapper = ({ title, contents, isLoggedIn, requestData }: ContentProps) => {
    console.log(isLoggedIn);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleContent = () => setIsOpen(state => !state);

    const contentsElement = contents.map((content) =>
        <NavContent 
            key={content.id}
            className={"content"}
            requestData={requestData}
            { ...content } 
        />
    );

    return (
        <StyledContainer>
            <StyledContentWrapper onClick={() => handleContent()}>
                <NavBodyButton isOpen={isOpen}>
                    <Icon 
                        define={BOTTOM_CHEVRON_ICON}
                        color={colors.MAIN_BLACK}
                    />
                </NavBodyButton>
                <span>{title}</span>
            </StyledContentWrapper>
            {
                isOpen && 
                (contents.length === 0 ? <NoContents /> : contentsElement )
            }
        </StyledContainer>
    );
};

export default NavContentWrapper;