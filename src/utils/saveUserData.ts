import { saveStorageData } from "./sessionStorage";
import { firebaseDB } from "~/services/database";
import { UserQuotesType } from "~/types/user.type";

export const saveUserData = (newUserQuotes: UserQuotesType, userId?: string): void => {
    if(userId) {
        firebaseDB.writeUserData(userId, newUserQuotes);
        return;
    }

    saveStorageData(newUserQuotes);
}