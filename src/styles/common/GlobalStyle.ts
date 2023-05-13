import { createGlobalStyle } from 'styled-components';
import { colors, sizes } from './';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, button {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }
    
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a, button {
        background: transparent;
        cursor: pointer;
    }

    html, body, #root, svg {
        width: 100%;
        height: 100%;
    }

    body {
        font-family: 'Noto Serif KR', 'Nanum Myeongjo', serif;
        color: ${colors.MAIN_WHITE};
    }

    #root {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* 모바일 브라우저 화면 대응 */
    @media screen and (max-device-width: ${sizes.TABLET_VIEWPORT_SIZE}){
        body {
            height: calc(var(--vh, 1vh) * 100);
        }
    }
`;

export default GlobalStyle;