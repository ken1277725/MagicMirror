/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("Stock", {

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
		url: ""
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

		this.addStockFetcher()
	},
	addStockFetcher: function () {
		console.log("send add_stock");
		this.sendSocketNotification("ADD_STOCK", {
			url: this.config.url,
			fetchInterval: this.config.fetchInterval
		})
		console.log("end add_stock");
	},
	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "STOCK_EVENTS") {
			console.log("STOCK_EVENTS", payload)
			this.stockLists = payload.events;
		}

		this.updateDom(this.config.animationSpeed);
	},

	// Override dom generator.
	getDom: function () {
		var complimentText = "Hello World";
		console.log("stock.getdom" + this.stockLists);
		var wrapper = document.createElement("table");
		var u = 0
		wrapper.className = this.config.tableClass;
		var now = moment()
		// this.busLists.sort([(a, b) => {
		// 	if (!a.EstimateTime) {
		// 		return 1;
		// 	}
		// 	if (!b.EstimateTime) {
		// 		return 0;
		// 	}
		// 	return a.EstimateTime < b.EstimateTime
		// }])
		for (var k in this.busLists) {
			data = this.busLists[k]
			//console.log("data,", data)
			//data.EstimateTime
			if (!data.EstimateTime) {
				continue
			}

			var routeName = data.RouteName.Zh_tw
			var updateTime = moment(data.SrcUpdateTime);
			var arrivedTime = moment(data.SrcUpdateTime).add(data.EstimateTime, "seconds");
			var remainTime = arrivedTime.subtract(now)
			var timeDiff = Math.ceil(moment(data.SrcUpdateTime).add(data.EstimateTime, "seconds").diff(now) / 1000);
			//console.log(routeName, "U", updateTime, "A", arrivedTime, "R", remainTime, "N", now, data.EstimateTime)
			//console.log(timeDiff)
			if (timeDiff < 0) {
				continue;
			}

			var innerNode = document.createElement("tr")
			var routeNameTD = document.createElement("td")
			var timeDiffTD = document.createElement("td")
			timeDiffTD.className += " timeDiff";
			routeNameTD.innerText = routeName
			var minutes = Math.floor(timeDiff / 60);
			var seconds = timeDiff - minutes * 60;
			timeDiffTD.innerText = minutes.toString() + "min";
			wrapper.appendChild(innerNode);
			innerNode.appendChild(routeNameTD);
			innerNode.appendChild(timeDiffTD);
			u++;
			if (u >= 5) {
				break;
			}
		}

		var currentFadeStep = 0;
		var lastSeenDate = "";


		//wrapper.innerText = ""
		console.log()
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