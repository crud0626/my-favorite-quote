import html2canvas from 'html2canvas';
import { HTML2CANVAS_CONFIG } from '~/config/html2canvas';

export const downloadImage = (target: HTMLElement): void => {
    html2canvas(target, HTML2CANVAS_CONFIG)
    .then(canvas => {
        const link = document.createElement('a');
        link.download = 'myFavoriteQuotes.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}