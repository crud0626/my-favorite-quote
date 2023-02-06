import React, { useCallback } from 'react';
import NavHeader from './NavHeader/NavHeader';
import NavAccordion from './NavBody/NavAccordion';
import { StyledNav } from './Nav.styles';
import { useUserStore } from '~/stores/useUserStore';
import { useNavStore } from '~/stores/useNavStore';
import { IQuoteContent } from '~/types/quote.type';
import { ChevronEventType } from '~/types/user.type';

interface IProps {
    handleCardFilp(direction: ChevronEventType): void;
    onChangeFavorite(target: IQuoteContent): void;
}

const Nav = ({ handleCardFilp, onChangeFavorite }: IProps) => {
    const { isOpenNav, handleNav } = useNavStore();
    const { userQuotes } = useUserStore();

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
                        handleCardFilp={handleCardFilp}
                        onChangeFavorite={onChangeFavorite}
                    />
                    <NavAccordion 
                        titleName={"favorite"}
                        contents={userQuotes.favorite}
                        handleCardFilp={handleCardFilp}
                        onChangeFavorite={onChangeFavorite}
                    />
                </ul>
            </div>
        </StyledNav>
    );
};

export default Nav;