'use strict';

app.accountInfoVM = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

(function (parent) {
    var accountModel = kendo.observable({
        fields: {
            telephone: '',
            email: '',
            firstName: '',
            lastName: '',
        },
        submit: function () {},
        cancel: function () {}
    });
    parent.set('accountModel', accountModel);
})(app.accountInfoVM);