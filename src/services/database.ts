import { QuoteData } from '~/App';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { firebaseApp } from "~/services/firebase";

export interface IFirebaseDB {
    writeUserData(userId: string, history: QuoteData[], favorite: QuoteData[]): void;
    readUserData(userId: string): Promise<UserData>;
}

export interface UserData {
    history: QuoteData[] | null;
    favorite: QuoteData[] | null;
}

export class FirebaseDB implements IFirebaseDB {
    private db = getDatabase(firebaseApp);
    constructor() {
    }

    writeUserData(userId: string, history: QuoteData[], favorite: QuoteData[]): void {
        set(ref(this.db, `users/${userId}`), {
            history: history,
            favorite: favorite
        });
    }

    async readUserData(userId: string): Promise<UserData> {
        const userData = {
            history: null,
            favorite: null
        };

        try {
            await get(child(ref(this.db), `users/${userId}`))
            .then(snapshot => {
                if(snapshot.exists()) {
                    const { history, favorite } = snapshot.val();
                    userData.history = history;
                    userData.favorite = favorite;
                }
            });

            return userData;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(`유저의 데이터를 가져오는 도중 에러가 발생했습니다. ${error.message}`);
            }
            throw new Error(`정의되지 않은 에러가 발생했습니다. ${error}`);
        }
    }
}