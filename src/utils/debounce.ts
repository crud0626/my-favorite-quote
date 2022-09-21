export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    callbackFn: F,
    timeout: number
): (...args: Parameters<F>) => void {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<F>): void => {
        clearTimeout(timer);
        timer = setTimeout(() => callbackFn(...args), timeout);
    }
}