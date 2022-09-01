import html2canvas from "html2canvas";

const config = {
    ignoreElements: (el: Element): boolean => (
        el instanceof HTMLDivElement 
        ? el.className.includes("inner_btn_wrapper")
        : false
    ),
    backgroundColor: null
};

export const downloadToImg = (target: HTMLElement): void => {
    html2canvas(target, config)
    .then(canvas => {
        const link = document.createElement('a');
        link.download = 'myFavoriteQuotes.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}