import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '../../../styles/common/colors';
import * as sizes from '../../../styles/common/sizes';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from '../../../styles/StyledButton';
import { ContentProps } from './NavBody';
import { NavBoxWrapper } from '../../../styles/NavBoxWrapper';
import NavContent from './NavContent';

interface ButtonProps {
    isOpen: boolean;
}

const StyledContainer = styled.div`
    min-height: 70px;
    height: auto;
    border-top: 1px solid ${colors.LIGHT_GRAY};

    &:last-child {
        border-bottom: 1px solid ${colors.LIGHT_GRAY};
    }
    
    & > .content:nth-child(2) {
        border-top: 1px solid ${colors.LIGHT_GRAY};
    }
`;

const StyledContentWrapper = styled(NavBoxWrapper)`
    justify-content: flex-start;
    cursor: pointer;

    & > :first-child {
        margin-right: ${sizes.SMALL_SPACE_SIZE};
    }
`;

const NavBodyButton = styled(StyledButton)<ButtonProps>`
    transition: all 0.3s ease-in-out;
    transform: ${props => props.isOpen ? "rotate(-180deg)" : "rotate(0deg)" };
    transform-origin: center;
`;

const NavContentWrapper = ({title, contents}: ContentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleContent = () => setIsOpen(state => !state);

    return (
        <>
            <StyledContainer>
                <StyledContentWrapper onClick={() => handleContent()}>
                    <NavBodyButton isOpen={isOpen}>
                        <FontAwesomeIcon 
                            icon={faChevronDown}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </NavBodyButton>
                    <span>{title}</span>
                </StyledContentWrapper>
                {
                    isOpen &&
                    contents.map(content =>
                        <NavContent 
                            className={"content"}
                            { ...content } 
                        />
                    )
                }
            </StyledContainer>
        </>
    );
};

export default NavContentWrapper;