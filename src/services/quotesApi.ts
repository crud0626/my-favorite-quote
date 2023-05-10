import { ResponseQuote, ServerQuoteForm } from "~/types/quote.type";

function isCorrectQuote(arg: any): arg is ServerQuoteForm {
    return arg._id && arg.content && arg.author;
}

const API_END_POINT = "https://api.quotable.io";

class QuotesAPI {
    getQuotesData = async (id?: string): Promise<ResponseQuote> => {
        const requestURL = `${API_END_POINT}/quotes/${id || "random"}`;

        try {
            const response = await fetch(requestURL);
            let resData = await response.json();

            // random 요청시에만 배열 형태로 응답.
            if (Array.isArray(resData)) resData = resData[0];

            if(response.ok && isCorrectQuote(resData)) {
                const { _id, content, author} = resData;

                const data: ResponseQuote = {
                    id: _id,
                    quote: content,
                    author
                };

                return data;
            }

            throw response.status;
        } catch(error) {
            throw new Error(`API 통신 중 에러가 발생했습니다. ${error}`);
        }
    }
}

export const quotesAPI = new QuotesAPI();