import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/common/colors';
import * as sizes from '../../styles/common/sizes';
import { NavButton } from './NavButton/NavButton';
import UserThumbnail from '../UserThumbnail/UserThumbnail';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${sizes.DEFAULT_SPACE_SIZE};
    width: 100%;
    height: ${sizes.HEADER_HEIGHT};
    background-color: ${colors.SUB_BLACK};

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SMALL_SPACE_SIZE}
    }
`;

const Logo = styled.a.attrs(() => ({href: '/'}))`
    color: ${colors.MAIN_WHITE};
    font-size: ${sizes.HEAD_FONT_SIZE};
    font-weight: lighter;
    text-decoration: none;
`;

const Header = () => {
    return (
        <StyledHeader>
            <div>
                <NavButton />
            </div>
            <div>
                <Logo>
                    <h1>myFavoriteQuotes</h1>
                </Logo>
            </div>
            <UserThumbnail size={sizes.DEFAULT_ICON_SIZE} />
        </StyledHeader>
    );
}

export default Header;
