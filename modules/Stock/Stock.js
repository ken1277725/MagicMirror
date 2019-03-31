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
		//console.log("stock.getdom" + this.stockLists);
		var wrapper = document.createElement("table");
		console.log(this.stockLists);
		if (!this.stockLists) {
			return wrapper;
		}
		var u = 0
		wrapper.className = this.config.tableClass;
		wrapper.className += " stockTable";
		var now = moment()
		for (var k in this.stockLists.msgArray) {
			msg = this.stockLists.msgArray[k]
			var diff = (parseFloat(msg.z) - parseFloat(msg.y)).toFixed(2);
			var out = {
				"名稱": msg.n,
				"最近成交價": msg.z,
				"漲跌價差": diff + "(" + (diff / parseFloat(msg.y) * 100).toFixed(2) + "%)",
				"累積成交量": msg.v,
				"最高": msg.h,
				"最低": msg.l
			}
			var innerNode = document.createElement("tr");
			var NameTD = document.createElement("td");
			var priceTD = document.createElement("td");
			var percentTD = document.createElement("td");
			NameTD.innerText = out["名稱"];
			priceTD.className += " spaceLeft";
			percentTD.className += " spaceLeft";
			priceTD.innerText = out["最近成交價"];
			percentTD.innerText = out["漲跌價差"];
			wrapper.appendChild(innerNode);
			innerNode.appendChild(NameTD);
			innerNode.appendChild(priceTD);
			innerNode.appendChild(percentTD);
			u++;
			if (u >= 4) {
				break;
			}
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