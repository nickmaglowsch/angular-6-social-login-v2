import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';

declare let VK: any;

export class VkontakteLoginProvider extends BaseLoginProvider {

    public static readonly PROVIDER_ID = 'vkontakte';
    public loginProviderObj: LoginProviderClass = new LoginProviderClass();

    constructor(private clientId: string) {
        super();
        this.loginProviderObj.id = clientId;
        this.loginProviderObj.name = 'vkontakte';
        this.loginProviderObj.url = 'https://vk.com/js/api/openapi.js';
    }

    initialize(): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            this.loadScript(this.loginProviderObj, () => {

                VK.init({
                    apiId: this.clientId
                });

                VK.Auth.login( function(response: any){
                    if (response.status === 'connected') {
                        VK.Api.call('users.get', {user_id: response.session.mid, fields: 'photo_max,contacts', v: '5.78'},
                             (res: any) => {
                                 resolve(VkontakteLoginProvider.drawUser(Object.assign({}, {token: response.session.sig}, res.response[0])));

                            }
                        );
                    }
                });
            });
        });
    }

    static drawUser(response: any): SocialUser {
        let user: SocialUser = new SocialUser();
        user.id = response.id;
        user.name = response.first_name + ' ' + response.last_name;
        user.image = response.photo_max;
        user.token = response.token;
        return user;
    }

    signIn(): Promise<SocialUser> {
        return new Promise<SocialUser>( (resolve, reject) => {
            VK.Auth.login(function (response: any) {
                if (response.status === 'connected') {
                    VK.Api.call('users.get', {user_id: response.session.mid, fields: 'photo_max,contacts', v: '5.78'},
                        (res: any) => {
                            resolve(VkontakteLoginProvider.drawUser(Object.assign({}, {token: response.session.sig}, res.response[0])));
                        }
                    );
                }
            });
        });
    }

    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.logout((response: any) => {
                resolve();
            });
        });
    }


}