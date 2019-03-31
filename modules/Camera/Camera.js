/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("Camera", {

	// Module config defaults.
	defaults: {
		maximumEntries: 10, // Total Maximum Entries
		maximumNumberOfDays: 365,
		displaySymbol: true,
		defaultSymbol: "calendar", // Fontawesome Symbol see http://fontawesome.io/cheatsheet/
		displayRepeatingCountTitle: false,
		defaultRepeatingCountTitle: "",
		maxTitleLength: 25,
		wrapEvents: false, // wrap events to multiple lines breaking at maxTitleLength
		fetchInterval: 10 * 1000, // Update every 5 minutes.
		animationSpeed: 2000,
		fade: true,
		urgency: 7,
		timeFormat: "relative",
		fullDayEventDateFormat: "MMM Do",
		showEnd: false,
		getRelative: 6,
		fadePoint: 0.25, // Start on 1/4th of the list.
		hidePrivate: false,
		hideOngoing: false,
		colored: false,
		coloredSymbolOnly: false,
		tableClass: "small",
		broadcastEvents: true,
		url: "",
		lastName: ""
	},


	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function () {
		Log.log("Starting module: " + this.name);

		// Set locale.
		// moment.updateLocale(config.language, this.getLocaleSpecification(config.timeFormat));

		this.addGAFetcher()
	},
	addGAFetcher: function () {
		console.log("send add_ga");
		this.sendSocketNotification("ADD_GA", {
			url: this.config.url,
			fetchInterval: this.config.fetchInterval
		})
		console.log("end add_ga");
	},
	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "GA_EVENTS") {
			console.log("GA_EVENTS", payload)
			this.stockLists = payload.events;
			console.log(this.stockLists);
		}

		this.updateDom(this.config.animationSpeed);
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("table");
		var bd = document.getElementsByTagName("body")[0];
		console.log(this.stockLists);
		if (!this.stockLists) {
			return wrapper;
		}
		if (this.stockLists.id == -1) {
			if (lastName === "") {

				bd.style.visibility = "hidden";
				return wrapper;
			}
			//leave

			wrapper.innerText = "Goodbye " + lastName + "!";
			lastName = "";
		} else {
			if (bd.style.visibility === "hidden") {
				bd.style.visibility = "visible";
			}
			wrapper.innerText = "Welcome " + this.stockLists.name + "!";

			lastName = this.stockLists.name
		}
		return wrapper;
	},



	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification == "STOCK_DATA") {
			console.log(typeof setCurrentWeatherType, this)
			this.setCurrentWeatherType(payload.data);
		}
	},

	getStyles: function () {
		return ["Stock.css", "font-awesome5.css", "font-awesome5.v4shims.css"];
	}

});