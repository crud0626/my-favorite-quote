import React, { useCallback } from 'react';
import { useQuotesStore } from '~/stores/useQuotesStore';
import { useModalStore } from '~/stores/useModalStore';
import NavHeader from './NavHeader/NavHeader';
import NavAccordion from './NavBody/NavAccordion';
import { StyledNav } from './Nav.styles';

const Nav = () => {
    const { isOpenNav, toggleNav } = useModalStore();
    const { userQuotes } = useQuotesStore();

    const onClick = useCallback((event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            toggleNav();
        }
    }, []);

    return (
        <StyledNav isOpenNav={isOpenNav} onClick={onClick}>
            <div>
                <NavHeader />
                <ul className='nav_body'>
                    <NavAccordion 
                        titleName={"history"}
                        contents={userQuotes.history}
                    />
                    <NavAccordion 
                        titleName={"favorite"}
                        contents={userQuotes.favorite}
                    />
                </ul>
            </div>
        </StyledNav>
    );
};

export default Nav;