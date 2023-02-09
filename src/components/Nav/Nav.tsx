import React, { useCallback } from 'react';
import NavHeader from './NavHeader/NavHeader';
import NavAccordion from './NavBody/NavAccordion';
import { StyledNav } from './Nav.styles';
import { useNavStore } from '~/stores/useNavStore';
import { useQuotesStore } from '~/stores/useQuotesStore';

const Nav = () => {
    const { isOpenNav, handleNav } = useNavStore();
    const { userQuotes } = useQuotesStore();


    const onClick = useCallback((event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleNav();
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