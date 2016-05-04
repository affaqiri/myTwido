'use strict';

app.authenticationView = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

(function (parent) {
    var provider = app.data.myTwido,
        mode = 'signin',
        registerRedirect = 'homeView',
        signinRedirect = 'homeView',
        rememberKey = 'myTwido_authData_authenticationViewModel',
        init = function (error) {
            if (error) {
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }

            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }

            var rememberedData = localStorage ? JSON.parse(localStorage.getItem(rememberKey)) : app[rememberKey];
            if (rememberedData && rememberedData.email && rememberedData.password) {

                parent.authenticationViewModel.set('email', rememberedData.email);
                parent.authenticationViewModel.set('password', rememberedData.password);
                parent.authenticationViewModel.signin();
            }
        },
        successHandler = function (data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect,
                model = parent.authenticationViewModel || {},
                logout = model.logout;

            if (logout) {
                model.set('logout', null);
            }
            if (data && data.result) {
                if (logout) {
                    provider.Users.logout(init, init);
                    return;
                }
                var rememberedData = {
                    email: model.email,
                    password: model.password
                };
                if (model.rememberme && rememberedData.email && rememberedData.password) {
                    if (localStorage) {
                        localStorage.setItem(rememberKey, JSON.stringify(rememberedData));
                    } else {
                        app[rememberKey] = rememberedData;
                    }
                }
                app.user = data.result;

                setTimeout(function () {
                    app.application.navigate('components/' + redirect + '/home.html');
                }, 0);
            } else {
                init();
            }
        },
        authenticationViewModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function (data) {
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }

                if (!data.password) {
                    alert('Missing password');
                    return false;
                }

                return true;
            },
            signin: function () {
                var model = authenticationViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }
                provider.Users.login(email, password, successHandler, init);
            },
            register: function () {
                var model = authenticationViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function () {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            }
        });

    parent.set('authenticationViewModel', authenticationViewModel);
    parent.set('afterShow', function (e) {
        if (e && e.view && e.view.params && e.view.params.logout) {
            if (localStorage) {
                localStorage.setItem(rememberKey, null);
            } else {
                app[rememberKey] = null;
            }
            authenticationViewModel.set('logout', true);
        }
        provider.Users.currentUser().then(successHandler, init);
    });
})(app.authenticationView);