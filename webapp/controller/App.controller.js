sap.ui.define([
	"sap/ui/Global",
	"sap/ui/core/mvc/Controller",
], (
	Global,
	Controller
) => {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit() {
			// Event handler 1 dumps
			Global.getCore().getEventBus().subscribe("TEST-EVENT-DUMP", function() {
				throw new Error("something went wrong in handler 1");
			});

			// Therefore event handler 2 is never called
			Global.getCore().getEventBus().subscribe("TEST-EVENT-DUMP", function(oKitten, sChannelName, oData) {
				console.log(oData.valueToLog);
			});




			// Event handler 1 never dumps
			Global.getCore().getEventBus().subscribe("TEST-EVENT", function() {
				console.log("Handler 1 runs");
			});

			// Therefore event handler 2 is called
			Global.getCore().getEventBus().subscribe("TEST-EVENT", function(oKitten, sChannelName, oData) {
				console.log(oData.valueToLog);
			});
		},

		publishDumpEvent() {
			console.clear()
			const oTestData = {
				valueToLog: 215
			};
			Global.getCore().getEventBus().publish("TEST-EVENT-DUMP", oTestData);
		},

		publishNormalEvent() {
			console.clear()
			const oTestData = {
				valueToLog: 215
			};
			Global.getCore().getEventBus().publish("TEST-EVENT", oTestData);
		}

	});

});
