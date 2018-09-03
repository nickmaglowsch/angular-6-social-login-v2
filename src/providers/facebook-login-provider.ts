import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'facebook';
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = 'facebook';
    this.loginProviderObj.url = 'https://connect.facebook.net/en_US/sdk.js';
  }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
        FB.init({
          appId: this.clientId,
          autoLogAppEvents: true,
          cookie: true,
          xfbml: true,
          version: 'v3.0'
        });

        FB.AppEvents.logPageView();

        FB.getLoginStatus(function (response: any) {
          if (response.status === 'connected') {
            const accessToken = FB.getAuthResponse()['accessToken'];
            FB.api('/me?fields=id,name,email,birthday,gender,accessToken', (res: any) => {
              resolve(res);
            });
          }
        });

      });
    });
  }

  drawUser(response: any) {
    let user = {
      id: response.id,
      name: response.name,
      email: response.email,
      token: response.token,
      birthday: response.birthday,
      gender: response.gender
    }
    return user;
  }

  getStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus(function (response: any) {
        if (response.status === 'connected') {
          const accessToken = FB.getAuthResponse()['accessToken'];
          FB.api('/me?fields=id,name,email,birthday,gender,accessToken', (res: any) => {
            resolve(res);
          });
        }
      });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          const accessToken = FB.getAuthResponse()['accessToken'];
          FB.api('/me?fields=id,name,email,birthday,gender,accessToken', (res: any) => {
            resolve(res);
          });
        }
      }, { scope: 'email,public_profile' });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve();
      });
    });
  }

}
