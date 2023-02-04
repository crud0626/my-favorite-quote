import * as colors from '~/styles/common/colors';

export const HTML2CANVAS_CONFIG = {
    logging: false,
    ignoreElements: (el: Element): boolean => (
        el instanceof HTMLDivElement 
        ? el.className.includes("inner_btn_wrapper")
        : false
    ),
    backgroundColor: colors.MAIN_BLACK
};