/** useCallback과 같이 사용해야하며 leading이 true라면 필수 */
export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    callbackFn: F,
    timeout = 0,
    leading = false
): (...args: Parameters<F>) => void => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    return function(this: any, ...args: Parameters<F>) {
        const context = this;

        if (leading && timer === null) callbackFn.apply(context, args);
        
        if (typeof timer === 'number') clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;

            if (!leading) {
                callbackFn.apply(context, args);
            }
        }, timeout);
    }
}