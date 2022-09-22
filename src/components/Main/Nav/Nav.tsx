import React, { useCallback } from 'react';
import { NavHeader } from '~/components/Main/Nav/NavHeader/NavHeader';
import NavContentWrapper from '~/components/Main/Nav/NavContentWrapper/NavContentWrapper';
import { IQuoteData, IUserInfo } from '~/types/interface';
import { StyledNav, NavBody, StyledNavProps } from '~/styles/Nav/StyledNav';

interface IProps extends StyledNavProps {
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
                <NavBody>
                    <NavContentWrapper 
                        title={"History"}
                        contents={historyList}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                    <NavContentWrapper 
                        title={"Favorite"}
                        contents={favoriteList}
                        onClickNavContent={onClickNavContent}
                        onChangeFavorite={onChangeFavorite}
                    />
                </NavBody>
            </div>
        </StyledNav>
    );
};

export default Nav;