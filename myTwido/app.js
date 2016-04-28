'use strict';

(function () {
    var app = {
        data: {}
    };
    
    var application, mobileSkin = "", defaultChartTheme = "silver";
    
    var bootstrap = function () {
        $(function () {
            application = new kendo.mobile.Application(document.body, {
                skin: 'flat',
                initial: 'components/dashBoardView/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            var element = document.getElementById('appDrawer');
            if (typeof (element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function (event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function (event) {
                        app.keepActiveState($(this).closest('li'));
                    });
                }
            }

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }
    
    app.chartsTheme = defaultChartTheme;

    //Skin change function is for the demo. On real project only one theme should be chosen.
    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            window.app.chartsTheme = "flat";
            mobileSkin = "flat";
        } else {
            e.sender.element.text("Flat");
            window.app.chartsTheme = defaultChartTheme;
            mobileSkin = "";
        }

        application.skin(mobileSkin);
        application.view().show();
    };
    
    app.emToPx = function (input) {
        var emSize = parseFloat($("body").css("font-size"));
        return (emSize * input);
    };

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());