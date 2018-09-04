import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';
export declare class VkontakteLoginProvider extends BaseLoginProvider {
    private clientId;
    static readonly PROVIDER_ID: string;
    loginProviderObj: LoginProviderClass;
    constructor(clientId: string);
    initialize(): Promise<SocialUser>;
    static drawUser(response: any): SocialUser;
    getStatus(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
