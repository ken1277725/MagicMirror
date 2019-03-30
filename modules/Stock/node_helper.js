/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var validUrl = require("valid-url");
var StockFetcher = require("./stockFetcher.js");

module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		var events = [];
		this.fetchers = [];
		console.log("Starting node helper for: " + this.name);

	},
	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "ADD_STOCK") {
			console.log("get add stock")
			var seturl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_1301.tw|tse_2881.tw|tse_2882.tw"; //|tse_2881.tw|tse_2882.tw
			this.createFetcher(seturl, payload.fetchInterval);
		}
	},

	/* createFetcher(url, reloadInterval)
	 * Creates a fetcher for a new url if it doesn't exist yet.
	 * Otherwise it reuses the existing one.
	 *
	 * attribute url string - URL of the news feed.
	 * attribute reloadInterval number - Reload interval in milliseconds.
	 */

	createFetcher: function (url, fetchInterval) {
		var self = this;
		console.log("check STOCK_url", url)
		// if (!validUrl.isUri(url)) {
		// 	self.sendSocketNotification("INCORRECT_URL", {
		// 		url: url
		// 	});
		// 	return;
		// }

		var fetcher;
		if (typeof self.fetchers[url] === "undefined") {
			console.log("Create new STOCK fetcher for url: " + url + " - Interval: " + fetchInterval);
			fetcher = new StockFetcher(url, fetchInterval);
			fetcher.onReceive(function (fetcher) {
				//console.log('Broadcast events.');
				//console.log(fetcher.events());
				//console.log("!")
				self.sendSocketNotification("STOCK_EVENTS", {
					events: fetcher.events()
				});
			});

			fetcher.onError(function (fetcher, error) {
				self.sendSocketNotification("FETCH_ERROR", {
					url: fetcher.url(),
					error: error
				});
			});

			self.fetchers[url] = fetcher;
		} else {
			//console.log('Use existing news fetcher for url: ' + url);
			fetcher = self.fetchers[url];
			fetcher.broadcastEvents();
		}

		fetcher.startFetch();
	}
});