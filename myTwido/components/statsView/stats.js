'use strict';

// Create the ViewModel
app.statsVM = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

(function (global, $) {
    var stockChart = null, app = global.app = global.app || {};

    app.stockChart = {

        createStockChart: function () {
            app.stockChart.drawStockChart();
            app.stockChart.bindResizeEvent();
        },

        drawStockChart: function () {
            var $stockChart, jsonUrlToLoad;

            if (stockChart !== null) {
                stockChart.destroy();
            }

            $stockChart = $("#stats-chart").empty();

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/boeing-stock.json");
            //jsonUrlToLoad = "data/boeing-stock.json";
            jsonUrlToLoad = "data/stats-ecs.json";

            $stockChart.kendoStockChart({
                theme: global.app.chartsTheme,
                renderAs: "svg",
                transitions: false,
                dataSource: {
                    transport: {
                        read: {
                            url: jsonUrlToLoad,
                            dataType: "json"
                        }
                    }
                },
                title: {
                    position: "top",
                    text: "Consommation ECS"
                },
                chartArea: {
                    background: "",
                    width: $(window).width(),
                    margin: app.emToPx(1)
                },
                dateField: "date",
                series: [
                    {
                        type: "line",
                        field: "ecs"
                    }
                ],
                navigator: {
                    series: {
                        type: "area",
                        field: "ecs"
                    },
                    select: {
                        from: "2014/01/01",
                        to: "2014/31/12"
                    }
                }
            });
        },

        bindResizeEvent: function () {
            //as the dataviz-s are complex elements they need redraw after window resize
            //in order to position themselves on the right place and right size
            $(window).on("resize.stockChart", $.proxy(app.stockChart.drawStockChart, app.stockChart));
        },

        unbindResizeEvent: function () {
            //unbind the "resize event" to prevent redundant calculations when the tab is not active
            $(window).off("resize.stockChart");
        }
    };
})(window, jQuery);