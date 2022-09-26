export const HTML2CANVAS_CONFIG = {
    ignoreElements: (el: Element): boolean => (
        el instanceof HTMLDivElement 
        ? el.className.includes("inner_btn_wrapper")
        : false
    ),
    backgroundColor: null
};