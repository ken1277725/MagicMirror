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
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.log("Starting module: " + this.name);

		// Set locale.
		// moment.updateLocale(config.language, this.getLocaleSpecification(config.timeFormat));

		this.addStockFetcher()
	},
	addStockFetcher: function () {
		this.sendSocketNotification("ADD_STOCK", {
			url: this.config.url,
			fetchInterval: this.config.fetchInterval
		})
	},
	// Override socket notification handler.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "STOCK_EVENTS") {
			console.log("STOCK_EVENTS", payload)
			this.stockLists = payload.events;
		}
		// 	if (this.hasCalendarURL(payload.url)) {
		// 		this.calendarData[payload.url] = payload.events;
		// 		this.loaded = true;

		// 		if (this.config.broadcastEvents) {
		// 			this.broadcastEvents();
		// 		}
		// 	}
		// } else if (notification === "FETCH_ERROR") {
		// 	Log.error("Calendar Error. Could not fetch calendar: " + payload.url);
		// } else if (notification === "INCORRECT_URL") {
		// 	Log.error("Calendar Error. Incorrect url: " + payload.url);
		// } else {
		// 	Log.log("Calendar received an unknown socket notification: " + notification);
		// }

		this.updateDom(this.config.animationSpeed);
	},

	// Override dom generator.
	getDom: function() {
		var complimentText = "Hello World";
		console.log("stock.getdom"+ this.stockLists);
		console.log("BUS try to get Dom")
		//var events = this.createEventList();
		var wrapper = document.createElement("table");
		// var hr = document.createElement("hr");
		// wrapper.appendChild(hr);
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
	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	},

	getStyles: function () {
		return ["Stock.css", "font-awesome5.css", "font-awesome5.v4shims.css"];
	}

});
