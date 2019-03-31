/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var validUrl = require("valid-url");
var GAFetcher = require("./CameraFetcher.js");

module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		var events = [];
		this.fetchers = [];
		console.log("Starting node helper for: " + this.name);

	},
	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "ADD_GA") {
			console.log("get add ga")
			var seturl = "";
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
		console.log("check GA_url", url)

		var fetcher;
		if (typeof self.fetchers[url] === "undefined") {
			console.log("Create new GA fetcher for url: " + url + " - Interval: " + fetchInterval);
			fetcher = new GAFetcher(url, fetchInterval);
			fetcher.onReceive(function (fetcher) {
				//console.log('Broadcast events.');
				//console.log(fetcher.events());
				//console.log("!")
				self.sendSocketNotification("GA_EVENTS", {
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