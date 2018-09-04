import { SocialUser } from './user';
export interface LoginProvider {
    initialize(): Promise<SocialUser>;
    getStatus(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
