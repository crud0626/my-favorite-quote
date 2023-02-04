import { getDatabase, ref, set, get, child } from "firebase/database";
import { firebaseApp } from "~/config/firebase";
import { UserQuotesType } from "~/types/user.type";

interface IFirebaseDB {
    writeUserData(userId: string, userData: UserQuotesType): void;
    readUserData(userId: string): Promise<UserQuotesType>;
}

export class FirebaseDB implements IFirebaseDB {
    private db = getDatabase(firebaseApp);
    constructor() {}

    writeUserData(userId: string, userData: UserQuotesType): void {
        set(ref(this.db, `users/${userId}`), userData);
    }

    async readUserData(userId: string): Promise<UserQuotesType> {
        const userQuotes: UserQuotesType = {
            history: [],
            favorite: []
        };

        try {
            await get(child(ref(this.db), `users/${userId}`))
            .then(snapshot => {
                if(snapshot.exists()) {
                    const { history, favorite } = snapshot.val();
                    userQuotes.history = history;
                    userQuotes.favorite = favorite;
                }
            });

            return userQuotes;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(`유저의 데이터를 가져오는 도중 에러가 발생했습니다. ${error.message}`);
            }
            throw new Error(`정의되지 않은 에러가 발생했습니다. ${error}`);
        }
    }
}