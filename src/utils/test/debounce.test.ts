import { debounce } from "../debounce";

describe("debounce", () => {
    jest.useFakeTimers();
    let callbackFn = jest.fn();

    afterEach(() => {
        callbackFn.mockReset();
    });

    it("lazy debounce", () => {
        const debounceFunc = debounce(callbackFn, 1000);

        for(let i = 0; i < 100; i++) {
            debounceFunc();
        }
        
        expect(callbackFn).not.toBeCalled();

        jest.runAllTimers();
        
        expect(callbackFn).toBeCalledTimes(1);
    })

    it("leading edge debounce", () => {
        const debounceFunc = debounce(callbackFn, 1000, true);

        for(let i = 0; i < 100; i++) {
            debounceFunc();
        }

        expect(callbackFn).toBeCalledTimes(1);

        jest.runAllTimers();
        
        expect(callbackFn).toBeCalledTimes(1);
    });
});