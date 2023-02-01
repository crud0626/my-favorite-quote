import React, { useCallback } from 'react';
import NavHeader from './NavHeader/NavHeader';
import NavAccordion from './NavBody/NavAccordion';
import { StyledNav, StyledNavProps } from './Nav.styles';
import { IQuoteContent } from '~/types/quote.type';
import { IUserInfo } from '~/types/user.type';

interface IProps extends StyledNavProps {
    historyList: IQuoteContent[];
    favoriteList: IQuoteContent[];
    userInfo: IUserInfo | null;
    isLoggedIn: boolean;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
    onClickNavContent(target: IQuoteContent): void;
    onChangeFavorite(target: IQuoteContent): void;
}

const Nav = ({ isNavOpen, historyList, userInfo, isLoggedIn, favoriteList, onClickNavContent, handleNav, handleLoginBox, onLogout, onChangeFavorite }: IProps) => {
    const onClick = useCallback((event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleNav();
        }
    }, []);

    return (
        <StyledNav isNavOpen={isNavOpen} onClick={onClick}>
            <div>
                <NavHeader 
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    handleLoginBox={handleLoginBox}
                    onLogout={onLogout}
                />
                <div className='nav_body'>
                    <NavAccordion 
                        titleName={"history"}
                        contents={historyList}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                    <NavAccordion 
                        titleName={"favorite"}
                        contents={favoriteList}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                </div>
            </div>
        </StyledNav>
    );
};

export default Nav;