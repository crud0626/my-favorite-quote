const API_END_POINT = "https://api.quotable.io";

export interface QuoteData {
    id: string;
    quote: string;
    author: string;
}

export class QuotesAPI {
    getInitialQuotes = async (): Promise<QuoteData> => {
        try {
            const response = await fetch(`${API_END_POINT}/random`);

            const { _id, content, author } = await response.json();

            if(response.ok) {
                const data: QuoteData = {
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