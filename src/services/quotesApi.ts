const API_END_POINT = "https://api.quotable.io";

export interface ResponseQuote {
    readonly id: string;
    readonly quote: string;
    readonly author: string;
}

export class QuotesAPI {
    getQuotesData = async (id?: string): Promise<ResponseQuote> => {
        const requestURL = id ? `${API_END_POINT}/quotes/${id}` : `${API_END_POINT}/random`;

        try {
            const response = await fetch(requestURL);

            const { _id, content, author } = await response.json();

            if(response.ok) {
                const data: ResponseQuote = {
                    id: _id,
                    quote: content,
                    author
                };

                return data;
            }

            throw new Error(`API 통신 중 에러가 발생했습니다. ${response.status}`);
        } catch(error) {
            throw new Error(`API 통신 중 에러가 발생했습니다. ${error}`);
        }
    }
}