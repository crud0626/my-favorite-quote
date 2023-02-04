import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "~/config/firebase";
import { IAuthService, ProviderNames } from "~/types/auth.type";
import { IUserInfo } from "~/types/user.type";

const checkUserInfo = (arg: any): arg is IUserInfo => {
    return 'displayName' in arg && 'photoURL' in arg && 'uid' in arg;
}

export class AuthService implements IAuthService {
    auth = getAuth(firebaseApp);
    private googleProvider = new GoogleAuthProvider();
    private facebookProvider = new FacebookAuthProvider();
    private githubProvider = new GithubAuthProvider();
    
    constructor() {
        this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    }

    private checkProvider(providerName: ProviderNames) {
        switch(providerName) {
            case "Google":
                return this.googleProvider;
            case "Facebook":
                return this.facebookProvider;
            case "Github":
                return this.githubProvider;
            default:
                throw new Error(`정의되지 않은 Provider입니다. : ${providerName}`);
        }
    }

    async requestLogin(providerName: ProviderNames): Promise<IUserInfo | null> {
        try {
            const provider = this.checkProvider(providerName);
            const response = await signInWithPopup(this.auth, provider).then(res => res.user);
            
            if(checkUserInfo(response)) {
                const userInfo: IUserInfo = {
                    displayName: response.displayName,
                    photoURL: response.photoURL,
                    uid: response.uid,
                }
    
                return userInfo;
            }

            return null;
        } catch (error) {
            let errMessage = "Unknown message";

            if(error instanceof Error) {
                errMessage = error.message;
            }

            throw new Error(`로그인 중 에러가 발생했습니다 : ${errMessage}`);
        }
    }

    async requestLogout() {
        try {
            return await signOut(this.auth).then(() => true);
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(`로그아웃 도중 에러가 발생했습니다. ${error.message}`);
            }
            throw new Error(`로그아웃 도중 예기치 않은 에러가 발생했습니다. ${error}`);
        }
    }
}