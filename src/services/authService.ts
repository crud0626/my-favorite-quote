import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "./firebase";

export interface IUserInfo {
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
}

export interface IAuthService {
    requestLogin(): Promise<IUserInfo | undefined>;
}

export class AuthService implements IAuthService {
    private auth = getAuth(firebaseApp);
    private googleProvider = new GoogleAuthProvider();
    
    constructor() {
        this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    }

    async requestLogin() {
        try {
            const response = await signInWithPopup(this.auth, this.googleProvider).then(res => res.user);
            if(response) {
                const userInfo: IUserInfo = {
                    displayName: response.displayName,
                    photoURL: response.photoURL,
                    uid: response.uid,
                }
    
                return userInfo;
            }
        } catch (error) {
            let errMessage = "Unknown message";
            if(error instanceof Error) {
                errMessage = error.message;
            }
            throw new Error(`로그인 중 에러가 발생했습니다 : ${errMessage}`);
        }
    }
}