import React, { useCallback } from 'react';
import NavHeader from './NavHeader/NavHeader';
import NavAccordion from './NavBody/NavAccordion';
import { StyledNav, StyledNavProps } from './Nav.styles';
import { IQuoteContent } from '~/types/quote.type';
import { useUserStore } from '~/stores/useUserStore';
import { IAuthService } from '~/types/auth.type';

interface IProps extends StyledNavProps {
    authService: IAuthService;
    handleNav(): void;
    handleLoginBox(): void;
    onClickNavContent(target: IQuoteContent): void;
    onChangeFavorite(target: IQuoteContent): void;
}

const Nav = ({ isNavOpen, authService, onClickNavContent, handleNav, handleLoginBox, onChangeFavorite }: IProps) => {
    const { userQuotes } = useUserStore();

    const onClick = useCallback((event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleNav();
        }
    }, []);

    return (
        <StyledNav isNavOpen={isNavOpen} onClick={onClick}>
            <div>
                <NavHeader 
                    authService={authService}
                    handleLoginBox={handleLoginBox}
                />
                <ul className='nav_body'>
                    <NavAccordion 
                        titleName={"history"}
                        contents={userQuotes.history}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                    <NavAccordion 
                        titleName={"favorite"}
                        contents={userQuotes.favorite}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                </ul>
            </div>
        </StyledNav>
    );
};

export default Nav;