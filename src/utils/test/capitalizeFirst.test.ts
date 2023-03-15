import { capitalizeFirst } from "../capitalizeFirst";

describe("capitalizeFirst", () => {
    let arg = "";

    it("return capitalized single word", () => {
        arg = "test string";

        expect(capitalizeFirst(arg)).toBe("Test string");
    });

    it("return capitalized multiple words", () => {
        arg = "test string";

        expect(capitalizeFirst(arg, true)).toBe("Test String");
    })

    it("return empty string", () => {
        arg = "";

        expect(capitalizeFirst(arg)).toBe("");
    })
});