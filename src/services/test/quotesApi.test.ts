import { ServerQuoteForm } from "~/types/quote.type";
import { quotesAPI } from "../quotesApi";

describe("quotesApi", () => {    
    const tempQuote: ServerQuoteForm = {
        _id: "123",
        content: "test",
        author: "tester"
    };
    const randomQuote: ServerQuoteForm[] = [tempQuote];

    it("Returns a quote if the response is successful", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(randomQuote)
        })) as jest.Mock;

        const response = await quotesAPI.getQuotesData();

        expect(global.fetch).toBeCalledWith("https://api.quotable.io/quotes/random");

        // 응답되는 객체가 1개이기 때문에 객체만 반환
        expect(response).toStrictEqual({
            id: tempQuote._id,
            quote: tempQuote.content,
            author: tempQuote.author
        });
    });

    it("Returns the status code if an unknown error occurs", async () => {
        const statusCode = 404;

        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
            status: statusCode,
            json: () => {}
        })) as jest.Mock;

        await expect(quotesAPI.getQuotesData)
        .rejects
        .toThrow(statusCode.toString());
    });

    it("Returns a specified error message if a defined error occurs", async () => {
        const errMessage = "에러가 발생했습니다.";
        
        global.fetch = jest.fn(() => Promise.reject(new Error(errMessage)));

        await expect(quotesAPI.getQuotesData)
        .rejects
        .toThrow(errMessage);
    });
});