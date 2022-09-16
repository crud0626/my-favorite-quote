import React from 'react';
import { NavHeader } from '~/components/Main/Nav/NavHeader';
import { NavBody } from '~/components/Main/Nav/NavBody';
import { IQuoteData } from '~/types/interface';
import { IUserInfo } from '~/services/authService';
import { StyledNav, StyledNavProps } from '~/styles/Nav/StyledNav';

interface RenderProps extends StyledNavProps {
    historyList: IQuoteData[];
    favoriteList: IQuoteData[];
    userInfo: IUserInfo;
    isLoggedIn: boolean;
    handleNav(): void;
    handleLoginBox(): void;
    onLogout(): Promise<void>;
    onClickNavContent(target: IQuoteData): void;
    onChangeFavorite(target: IQuoteData): void;
}

const Nav = ({ isNavOpen, historyList, userInfo, isLoggedIn, favoriteList, onClickNavContent, handleNav, handleLoginBox, onLogout, onChangeFavorite }: RenderProps) => {
    const onClick = (event: React.MouseEvent) => {
        if(event.target === event.currentTarget) {
            handleNav();
        }
    }

    return (
        <StyledNav isNavOpen={isNavOpen} onClick={onClick}>
            <div>
                <NavHeader 
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    handleLoginBox={handleLoginBox}
                    onLogout={onLogout}
                />
                <NavBody 
                    historyList={historyList} 
                    isLoggedIn={isLoggedIn}
                    favoriteList={favoriteList}
                    onClickNavContent={onClickNavContent}
                    onChangeFavorite={onChangeFavorite}
                />
            </div>
        </StyledNav>
    );
};

export default Nav;