'use strict';

// Create the ViewModel
app.homeVM = kendo.observable({
    onShow: function () {
        createGauge();
    },
    afterShow: function () {},
    hide: function () {}
});

function createGauge() {
    var $v38Gauge = $("#v38-gauge");
    $v38Gauge.kendoLinearGauge({
        pointer: [
            {
            	value: 10,
	            color: "#c20000",
    	        shape: "arrow"
           	},
            {
            	value: 70,
            	color: "#ff7a00",
            	margin: 10
            }, 
            {
            	value: 140,
            	color: "#ffc700"
            }
        ],
        scale: {
            minorUnit: 5,
            min: 0,
            max: 180,
            vertical: false
        }
    });
}