import styled from 'styled-components';
import { colors, sizes } from '~/styles/common';
import { flexAligns } from '~/styles/mixins';

interface BtnProps {
    link: string;
    size?: string;
}

export const FooterLinkBtn = styled.a.attrs(({ link }: BtnProps) => ({
    target: "_blank",
    href: link,
    rel: 'noopener noreferrer' 
}))<BtnProps>`
    display: block;
    padding: 0;
    border: 0;
    width: ${({ size }) => size || sizes.DEFAULT_ICON_SIZE};
    height: ${({ size }) => size || sizes.DEFAULT_ICON_SIZE};

    & > svg {
        fill: ${colors.MAIN_WHITE};
    }

    &:hover > svg {
        fill: ${colors.ICON_HOVER_COLOR};
    }
`;

export const StyledFooter = styled.footer`
    ${flexAligns('space-between')}
    padding: 0 ${sizes.SPACE_7X};
    width: 100%;
    height: ${sizes.FOOTER_HEIGHT};
    background-color: ${colors.SUB_BLACK};

    & .copyright > span {
        font-size: ${sizes.SUB_FONT_SIZE};
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}) {
        padding: ${sizes.SPACE_2X};
    }
`;