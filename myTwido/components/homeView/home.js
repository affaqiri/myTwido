'use strict';

// Create the ViewModel
app.homeVM = kendo.observable({
    onShow: function () {
        createGauge();
    },
    afterShow: function () {},
    hide: function () {}
});

(function (parent) {
    var homeModel = kendo.observable({
        fields: {
            capacity : 320,
            horsGel: true,
            contratEnergie: false,
            planificateur: false,
            permanent: false,
        },
        onHorsGel: function (e) {
            if (e.checked) {
                e.preventDefault();
                app.homeVM.homeModel.set("fields.contratEnergie", false);
                app.homeVM.homeModel.set("fields.planificateur", false);
                app.homeVM.homeModel.set("fields.permanent", false);
            }
        },
        onContratEnergie: function (e) {
            if (e.checked) {
                e.preventDefault();
                app.homeVM.homeModel.set("fields.horsGel", false);
                app.homeVM.homeModel.set("fields.planificateur", false);
                app.homeVM.homeModel.set("fields.permanent", false);
            }
        },
        onPlanificateur: function (e) {
            if (e.checked) {
                e.preventDefault();
                app.homeVM.homeModel.set("fields.contratEnergie", false);
                app.homeVM.homeModel.set("fields.horsGel", false);
                app.homeVM.homeModel.set("fields.permanent", false);
            }
        },
        onPermanent: function (e) {
            if (e.checked) {
                e.preventDefault();
                app.homeVM.homeModel.set("fields.contratEnergie", false);
                app.homeVM.homeModel.set("fields.planificateur", false);
                app.homeVM.homeModel.set("fields.horsGel", false);
            }
        },
        onSliderChange: function () {
            console.log(app.homeVM.homeModel.get("fields.capacity"));
            //app.homeVM.homeModel.get("fields.capacity")
            
            var gauge = $("#v38-gauge");
            console.log(gauge);

        },
        submit: function () {},
        cancel: function () {}
    });
    parent.set('homeModel', homeModel);
})(app.homeVM);

function createGauge() {

    var center;
    var radius;

    $("#v38-donut").kendoChart({
        chartArea: {
            width: 140,
            height: 140
        },
        series: [{
            type: "donut",
            holeSize: 60,
            overlay: {
                gradient: "none"
            },
            visual: function (e) {
                center = e.center;
                radius = e.radius;
                return e.createVisual();
            },
            data: [
                {
                    value: 35,
                    color: "#3498db"
                },
                {
                    value: 25,
                    color: "#bdc3c7"
                }
            ]
        }],
        tooltip: {
            visible: false
        },
        render: function (e) {
            var draw = kendo.drawing;
            var geom = kendo.geometry;
            var chart = e.sender;

            var circleGeometry = new geom.Circle(center, radius);
            var bbox = circleGeometry.bbox();

            // Render the text
            var text = new draw.Text("50L", [0, 0], {
                font: "18px Verdana,Arial,sans-serif"
            });

            // Align the text in the bounding box
            draw.align([text], bbox, "center");
            draw.vAlign([text], bbox, "center");

            // Draw it on the Chart drawing surface
            e.sender.surface.draw(text);
        }
    })

    $("#cap-donut").kendoChart({
        chartArea: {
            width: 140,
            height: 140
        },
        series: [{
            type: "donut",
            holeSize: 60,
            overlay: {
                gradient: "none"
            },
            visual: function (e) {
                center = e.center;
                radius = e.radius;
                return e.createVisual();
            },
            data: [
                {
                    value: 35,
                    color: "#3498db"
                },
                {
                    value: 25,
                    color: "#bdc3c7"
                }
            ]
        }],
        tooltip: {
            visible: false
        },
        render: function (e) {
            var draw = kendo.drawing;
            var geom = kendo.geometry;
            var chart = e.sender;

            var circleGeometry = new geom.Circle(center, radius);
            var bbox = circleGeometry.bbox();

            // Render the text
            var text = new draw.Text("80L", [0, 0], {
                font: "18px Verdana,Arial,sans-serif bold"
            });

            // Align the text in the bounding box
            draw.align([text], bbox, "center");
            draw.vAlign([text], bbox, "center");

            // Draw it on the Chart drawing surface
            e.sender.surface.draw(text);
        }
    })

    $("#v38-pie").kendoSparkline({
        type: "donut",
        data: [80, 240]
    })

    var $v38Range = $("#v38-range");
    $v38Range.kendoSparkline({
        type: "bullet",
        data: [21, 23],
        valueAxis: {
            min: 0,
            max: 30,
            plotBands: [
                {
                    from: 0,
                    to: 15,
                    color: "#787878",
                    opacity: 0.15
                },
                {
                    from: 15,
                    to: 22,
                    color: "#787878",
                    opacity: 0.3
                },
                {
                    from: 22,
                    to: 30,
                    color: "#787878",
                    opacity: 0.15
                }
            ]
        },
        tooltip: {
            visible: true
        }
    });

    var $v38Gauge = $("#v38-gauge");
    $v38Gauge.kendoLinearGauge({
        pointer: [
            {
                value: 150,
                color: "#c20000",
                shape: "arrow"
           	},
            {
                value: app.homeVM.homeModel.get("fields.capacity"),
                size: 15,
                color: "red"
            }
        ],
        scale: {
            labels: {
                format: "L"
            },
            majorUnit: 40,
            minorUnit: 20,
            min: 0,
            max: 320,
            vertical: false,
            ranges: [
                {
                    from: 0,
                    to: 80,
                    color: "#3D9970"
               },
                {
                    from: 81,
                    to: 160,
                    color: "#39CCCC"
               },
                {
                    from: 161,
                    to: 240,
                    color: "#7FDBFF"
               },
                {
                    from: 241,
                    to: 320,
                    color: "#0074D9"
               }
            ]
        }
    });
}