/* Magic Mirror
 * Node Helper: Calendar - CalendarFetcher
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var moment = require("moment");
const request = require("request");
var app = require("express")();

//var io = require("socket.io").listen(server);
//var express = require( "express" );
//var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
app.use(bodyParser.json())

//var http_server = http.createServer( app ).listen( 3000 );
//var http_io = require( "socket.io" )( http_server );

http.listen(3000, function () {
	console.log("listening...");
});


//"https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei?$filter=StopName%2FZh_tw%20eq%20"%E5%85%89%E8%8F%AF%E5%95%86%E5%A0%B4"&$top=30&$format=JSON"
var GAFetcher = function (url, reloadInterval = 10) {
	var self = this;

	var reloadTimer = null;
	var events = [];

	var fetchFailedCallback = function () {};
	var eventsReceivedCallback = function () {};

	/* fetchCalendar()
	 * Initiates calendar fetch.
	 */
	var fetchBusInfo = function () {
		events = [];
		clearTimeout(reloadTimer);
		reloadTimer = null;
		nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1]);
		console.log("check")
		app.post("/", function (req, res) {
			var msg = req.body;
			console.log("python: " + msg.user_text + "," + msg.google_text);
			events.push(msg);
			self.broadcastEvents();
			res.sendStatus(200);
		});
		console.log(events);
		//self.broadcastEvents();
		scheduleTimer()
	};

	/* scheduleTimer()
	 * Schedule the timer for the next update.
	 */
	var scheduleTimer = function () {
		//console.log("Schedule update timer.");
		clearTimeout(reloadTimer);
		reloadTimer = setTimeout(function () {
			fetchBusInfo();
		}, reloadInterval);
	};

	/* public methods */

	/* startFetch()
	 * Initiate fetchCalendar();
	 */
	this.startFetch = function () {
		fetchBusInfo();
	};

	/* broadcastItems()
	 * Broadcast the existing events.
	 */
	this.broadcastEvents = function () {
		//console.log("Broadcasting " + events.length + " events.");
		eventsReceivedCallback(self);
	};

	/* onReceive(callback)
	 * Sets the on success callback
	 *
	 * argument callback function - The on success callback.
	 */
	this.onReceive = function (callback) {
		eventsReceivedCallback = callback;
	};

	/* onError(callback)
	 * Sets the on error callback
	 *
	 * argument callback function - The on error callback.
	 */
	this.onError = function (callback) {
		fetchFailedCallback = callback;
	};

	/* url()
	 * Returns the url of this fetcher.
	 *
	 * return string - The url of this fetcher.
	 */
	this.url = function () {
		return url;
	};

	/* events()
	 * Returns current available events for this fetcher.
	 *
	 * return array - The current available events for this fetcher.
	 */
	this.events = function () {
		return events;
	};

};


module.exports = GAFetcher;