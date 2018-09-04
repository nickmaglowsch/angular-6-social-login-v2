(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
	(factory((global['angular-6-social-login-v2'] = {}),global.ng.core,global.ng.common,global.Rx));
}(this, (function (exports,core,common,rxjs) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var AuthServiceConfig = /** @class */ (function () {
    function AuthServiceConfig(providers) {
        this.providers = new Map();
        for (var /** @type {?} */ i = 0; i < providers.length; i++) {
            var /** @type {?} */ element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return AuthServiceConfig;
}());
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        var _this = this;
        this._user = null;
        this._authState = new rxjs.BehaviorSubject(null);
        this.providers = config.providers;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function (user) {
                user.provider = key;
                _this._user = user;
                _this._authState.next(user);
            }).catch(function (err) {
                // this._authState.next(null);
            });
        });
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providerId
     * @return {?}
     */
    AuthService.prototype.getStatus = /**
     * @param {?} providerId
     * @return {?}
     */
    function (providerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.getStatus().then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                });
            }
            else {
                reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    /**
     * @param {?} providerId
     * @return {?}
     */
    AuthService.prototype.signIn = /**
     * @param {?} providerId
     * @return {?}
     */
    function (providerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                });
            }
            else {
                reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._user && _this._user.provider) {
                var /** @type {?} */ providerId = _this._user.provider;
                var /** @type {?} */ providerObject = _this.providers.get(providerId);
                providerObject.signOut().then(function () {
                    _this._user = null;
                    _this._authState.next(null);
                    resolve();
                }).catch(function (err) {
                    _this._authState.next(null);
                });
            }
            else {
                reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    AuthService.LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    AuthService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: AuthServiceConfig }
    ]; };
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SocialLoginModule = /** @class */ (function () {
    function SocialLoginModule() {
    }
    SocialLoginModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    providers: [
                        AuthService
                    ]
                },] },
    ];
    return SocialLoginModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SocialUser = /** @class */ (function () {
    function SocialUser() {
    }
    return SocialUser;
}());
var LoginProviderClass = /** @class */ (function () {
    function LoginProviderClass() {
    }
    return LoginProviderClass;
}());
var LinkedInResponse = /** @class */ (function () {
    function LinkedInResponse() {
    }
    return LinkedInResponse;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
    }
    /**
     * @param {?} obj
     * @param {?} onload
     * @return {?}
     */
    BaseLoginProvider.prototype.loadScript = /**
     * @param {?} obj
     * @param {?} onload
     * @return {?}
     */
    function (obj, onload) {
        if (document.getElementById(obj.name)) {
            return;
        }
        var /** @type {?} */ signInJS = document.createElement('script');
        signInJS.async = true;
        signInJS.src = obj.url;
        signInJS.onload = onload;
        if (obj.name === 'LINKEDIN') {
            signInJS.async = false;
            signInJS.text = ('api_key: ' + obj.id).replace('\'', '');
        }
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'google';
        _this.loginProviderObj.url = 'https://apis.google.com/js/platform.js';
        return _this;
    }
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init({
                        client_id: _this.clientId,
                        scope: 'email'
                    });
                    _this.auth2.then(function () {
                        if (_this.auth2.isSignedIn.get()) {
                            resolve(_this.drawUser());
                        }
                    });
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.drawUser = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ user = new SocialUser();
        var /** @type {?} */ profile = this.auth2.currentUser.get().getBasicProfile();
        var /** @type {?} */ authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.image = profile.getImageUrl();
        user.token = authResponseObj.access_token;
        user.idToken = authResponseObj.id_token;
        return user;
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.getStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                _this.auth2.then(function () {
                    if (_this.auth2.isSignedIn.get()) {
                        resolve(_this.drawUser());
                    }
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ promise = _this.auth2.signIn();
            promise.then(function () {
                resolve(_this.drawUser());
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth2.signOut().then(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    GoogleLoginProvider.PROVIDER_ID = 'google';
    return GoogleLoginProvider;
}(BaseLoginProvider));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FacebookLoginProvider = /** @class */ (function (_super) {
    __extends$1(FacebookLoginProvider, _super);
    function FacebookLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'facebook';
        _this.loginProviderObj.url = 'https://connect.facebook.net/en_US/sdk.js';
        return _this;
    }
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                FB.init({
                    appId: _this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v3.0'
                });
                FB.AppEvents.logPageView();
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me?fields=id,name,email,birthday,gender', function (res) {
                            resolve(res);
                        });
                    }
                });
            });
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    FacebookLoginProvider.prototype.drawUser = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var /** @type {?} */ user = {
            id: response.id,
            name: response.name,
            email: response.email,
            token: response.token,
            birthday: response.birthday,
            gender: response.gender
        };
        return user;
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.getStatus = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.api('/me?fields=id,name,email,birthday,gender', function (res) {
                        resolve(res);
                    });
                }
            });
        });
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me?fields=id,name,email,birthday,gender', function (res) {
                        resolve(res);
                    });
                }
            }, { scope: 'email,public_profile' });
        });
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            FB.logout(function (response) {
                resolve();
            });
        });
    };
    FacebookLoginProvider.PROVIDER_ID = 'facebook';
    return FacebookLoginProvider;
}(BaseLoginProvider));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LinkedinLoginProvider = /** @class */ (function (_super) {
    __extends$2(LinkedinLoginProvider, _super);
    function LinkedinLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'linkedin';
        _this.loginProviderObj.url = 'https://platform.linkedin.com/in.js';
        return _this;
    }
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                IN.init({
                    api_key: _this.clientId,
                    authorize: true,
                    onLoad: _this.onLinkedInLoad()
                });
                IN.Event.on(IN, 'auth', function () {
                    if (IN.User.isAuthorized()) {
                        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                            resolve(_this.drawUser(res));
                        });
                    }
                });
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.onLinkedInLoad = /**
     * @return {?}
     */
    function () {
        IN.Event.on(IN, 'systemReady', function () {
            IN.User.refresh();
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    LinkedinLoginProvider.prototype.drawUser = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var /** @type {?} */ user = new SocialUser();
        user.id = response.emailAddress;
        user.name = response.firstName + ' ' + response.lastName;
        user.email = response.emailAddress;
        user.image = response.pictureUrl;
        user.token = IN.ENV.auth.oauth_token;
        return user;
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.getStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            IN.Event.on(IN, 'auth', function () {
                if (IN.User.isAuthorized()) {
                    IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                        resolve(_this.drawUser(res));
                    });
                }
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            IN.User.authorize(function () {
                IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                    resolve(_this.drawUser(res));
                });
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            IN.User.logout(function (response) {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    LinkedinLoginProvider.PROVIDER_ID = 'linkedin';
    return LinkedinLoginProvider;
}(BaseLoginProvider));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VkontakteLoginProvider = /** @class */ (function (_super) {
    __extends$3(VkontakteLoginProvider, _super);
    function VkontakteLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'vkontakte';
        _this.loginProviderObj.url = 'https://vk.com/js/api/openapi.js';
        return _this;
    }
    /**
     * @return {?}
     */
    VkontakteLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                VK.init({
                    apiId: _this.clientId
                });
                VK.Auth.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        VK.Api.call('users.get', { user_id: response.session.mid, fields: 'photo_max,contacts', v: '5.78' }, function (res) {
                            resolve(VkontakteLoginProvider.drawUser(Object.assign({}, { token: response.session.sig }, res.response[0])));
                        });
                    }
                });
            });
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    VkontakteLoginProvider.drawUser = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        var /** @type {?} */ user = new SocialUser();
        user.id = response.id;
        user.name = response.first_name + ' ' + response.last_name;
        user.image = response.photo_max;
        user.token = response.token;
        return user;
    };
    /**
     * @return {?}
     */
    VkontakteLoginProvider.prototype.getStatus = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            VK.Auth.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    VK.Api.call('users.get', { user_id: response.session.mid, fields: 'photo_max,contacts', v: '5.78' }, function (res) {
                        resolve(VkontakteLoginProvider.drawUser(Object.assign({}, { token: response.session.sig }, res.response[0])));
                    });
                }
            });
        });
    };
    
    /**
     * @return {?}
     */
    VkontakteLoginProvider.prototype.signIn = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            VK.Auth.login(function (response) {
                if (response.status === 'connected') {
                    VK.Api.call('users.get', { user_id: response.session.mid, fields: 'photo_max,contacts', v: '5.78' }, function (res) {
                        resolve(VkontakteLoginProvider.drawUser(Object.assign({}, { token: response.session.sig }, res.response[0])));
                    });
                }
            });
        });
    };
    /**
     * @return {?}
     */
    VkontakteLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        return new Promise(function (resolve, reject) {
            VK.Auth.logout(function (response) {
                resolve();
            });
        });
    };
    VkontakteLoginProvider.PROVIDER_ID = 'vkontakte';
    return VkontakteLoginProvider;
}(BaseLoginProvider));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

exports.SocialLoginModule = SocialLoginModule;
exports.AuthService = AuthService;
exports.AuthServiceConfig = AuthServiceConfig;
exports.SocialUser = SocialUser;
exports.LoginProviderClass = LoginProviderClass;
exports.LinkedInResponse = LinkedInResponse;
exports.FacebookLoginProvider = FacebookLoginProvider;
exports.VkontakteLoginProvider = VkontakteLoginProvider;
exports.GoogleLoginProvider = GoogleLoginProvider;
exports.LinkedinLoginProvider = LinkedinLoginProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
