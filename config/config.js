/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "", "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [{
		module: "alert"
	},
	// {
	// 	module: "MMM-GoogleTasks",
	// 	header: "Google Tasks",
	// 	position: "top_left",
	// 	config: {
	// 		listID: "MTU3NDQ4MDA4MjAxNzAzMzI1NzQ6MDow"
	// 		// See below for Configuration Options
	// 	}
	// },
	{
		module: "MMM-EmbedYoutube", // Path to youtube module from modules folder Exmaple: MagicMirror/modules/custom/MMM-EmbedYoutube/ so it's custom/MMM-EmbedYoutube
		position: "bottom_bar", // This can be any of the regions.
		config: {
			// See 'Configuration options' in README.md for more information.
			video_id: "w3jLJU7DT5E",
			loop: true,
			autoplay: true,
			color: "red"
		}
	},
	{
		module: "updatenotification",
		position: "top_bar"
	},
	{
		module: "clock",
		position: "top_left"
	},
	// {
	// 	module: "MMM-MyCalendar",
	// 	position: "top_left", // This can be any of the regions. Best results in left or right regions.
	// 	config: {
	// 		// The config property is optional.
	// 		// If no config is set, an example calendar is shown.
	// 		// See 'Configuration options' for more information.
	// 	}
	// },

	// {
	// 	module: "calendar",
	// 	header: "US Holidays",
	// 	position: "top_left",
	// 	config: {
	// 		calendars: [
	// 			{
	// 				symbol: "calendar-check",
	// 				url:
	//                     "webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics"
	// 			}
	// 		]
	// 	}
	// },
	// {
	// 	module: "compliments",
	// 	position: "lower_third"
	// },
	{
		module: "currentweather",
		position: "top_right",
		config: {
			location: "Taipei",
			locationID: "1668341", //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
			appid: "4d7cc19eb1a010cef5e969401e23e1ce"
		}
	},
	{
		module: "Taiwan-Bus",
		position: "top_right",
		config: {}
	},
	{
		module: "MMM-AssistantMk2",
		position: "top_left",
		config: {

			// --- ESSENTIALS / modifying for your environment might be needed.


			deviceLocation: {
				coordinates: { // set the latitude and longitude of the device to get localized information like weather or time. (ref. mygeoposition.com)
					latitude: 51.5033640, // -90.0 - +90.0
					longitude: -0.1276250, // -180.0 - +180.0
				},
			},

			defaultProfile: "default", // If you have several profiles and want to set one of them as default profile, describe here.

			profiles: {
				"default": { // profile name.
					profileFile: "default.json", // profile file name.
					lang: "en-US"
					//currently available (estimation, not all tested):
					//  de-DE, en-AU, en-CA, en-GB, en-US, en-IN
					// fr-CA, fr-FR, it-IT, ja-JP, es-ES, es-MX, ko-KR, pt-BR
					// https://developers.google.com/assistant/sdk/reference/rpc/languages
				},
				/* Add your other profiles here, if exists.
				"other_profile" : {
				  profileFile: "other.json",
				  lang: "de-DE"
				}
				*/
			},

			record: { // Full values are in `FOR EXPERTS` section.
				recordProgram: "arecord",  // Defaults to "arecord" - also supports "rec" and "sox"
				device: null        // recording device (e.g.: "plughw:1")
			},

			play: { // Full values are in `FOR EXPERTS` section.
				playProgram: "mpg321", // recommended.
			},


			// --- OPTIONAL / not important but customizable for your usage


			responseVoice: true, // If available, Assistant will response with her voice.
			responseScreen: true, // If available, Assistant will response with some rendered HTML
			responseAlert: true, // If available, Assistant will response with Alert module of MM
			// Sometimes, any response might not be returned. responseAlert is useful for displaying error.

			screenZoom: "80%", // Adjust responseScreen to your mirror size.
			screenDuration: 0, // milliseconds. How long responseScreen will be shown after speech.
			//If you set 0, Screen Output will be closed after Response speech finishes ASAP.

			youtubeAutoplay: true, //If set as true, found Youtube video will be played automatically.
			pauseOnYoutube: true, //If set as true, You cannot activate Assistant during youtube playing. Recommended for the performance (Because permanent hotword detecting might make performance lower)

			youtubePlayerVars: { // You can set youtube playerVars for your purpose, but should be careful.
				"controls": 0,
				"loop": 1,
				"rel": 0,
			},
			youtubePlayQuality: "default", //small, medium, large, hd720, hd1080, highres or default

			useWelcomeMessage: "brief today", //Try "brief today" as this value. You can use this value to check module working when MM is starting.

			onIdle: {
				//timer: 1000*60*30, // if you don't want to use this feature, just set timer as `0` or command as ""
				//command: "HIDEMODULES",
				timer: 0,
				command: null,
			},

			onActivate: {
				timer: 0,
				//command: "SHOWMODULES"
				command: null,
			},


			// --- FOR EXPERTS / For development, debug or more


			verbose: false, // You can get error or some logs when this value is set as true.
			ignoreNoVoiceError: true, //To avoid some annoying youtube stop bug.

			startChime: "connection.mp3", // you can use `mp3` to play chime when your mic is ready. It should be playable with your `play.playProgram`
			noChimeOnSay: false, // When using the `ASSISTANT_SAY` trigger, you can prevent the chime from being played before your words

			auth: { // I believe you don't need to change this.
				keyFilePath: "./credentials.json"
			},

			record: { // Full version
				sampleRate: 16000,      // audio sample rate
				threshold: 0.5,        // silence threshold (rec only)
				thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
				thresholdEnd: null,       // silence threshold to end recording, overrides threshold (rec only)
				silence: 1.0,        // seconds of silence before ending
				verbose: false,      // log info to the console
				recordProgram: "arecord",  // Defaults to "arecord" - also supports "rec" and "sox"
				device: null        // recording device (e.g.: "plughw:1")
			},

			play: { // Full version
				encodingOut: "MP3", //'MP3' or 'WAV' is available, but you might not need to modify this.
				sampleRateOut: 24000,
				playProgram: "mpg321", //Your prefer sound play program. By example, if you are running this on OSX, `afplay` could be available.
				playOption: [],
				// If you need additional options to use playProgram, describe here. (except filename)
				// e.g: ["-d", "", "-t", "100"]
			},

			useGactionCLI: false, // If set as true, you can update your gAction when MM is rebooted.
			projectId: "", // Google Assistant ProjectId (Required only when you use gAction.)
			deviceModelId: "", // It should be described in your config.json. In most of case, you don't need to this.
			deviceInstanceId: "", // It should be described in your config.json. In most of case, you don't need to this.

			recipes: ["hide_and_show_all_modules.js", "reboot.js", "screen_onoff.js", "shutdown.js"],
			transcriptionHook: {},
			action: {}, // You can catch your gAction command.
			command: {}, // You can catch transcription hook and be able to make your own `COMMAND` with this.
			//See the `transcriptionHook` section.
			action: {}, // You can make your own MM command for gAction and transcriptionHook
			//See the `command` section.

			notifications: { // You can redefine these notifications to communicate with specific modules.
				ASSISTANT_ACTIVATE: "ASSISTANT_ACTIVATE",
				ASSISTANT_DEACTIVATE: "ASSISTANT_CLEAR",
				ASSISTANT_ACTIVATED: "ASSISTANT_ACTIVATED",
				ASSISTANT_DEACTIVATED: "ASSISTANT_DEACTIVATED",
				ASSISTANT_ACTION: "ASSISTANT_ACTION",
				ASSISTANT_UNDERSTOOD: "ASSISTANT_UNDERSTOOD",
				ASSISTANT_RESPONSE_END: "ASSISTANT_RESPONSE_END",
				DEFAULT_HOOK_NOTIFICATION: "ASSISTANT_HOOK",
				TEXT_QUERY: "ASSISTANT_QUERY",
				SAY_TEXT: "ASSISTANT_SAY",
			}
		}
	},
	{
		module: 'MMM-Hotword',
		config: {
			snowboy: [
				{
					hotwords: "smartmirror", //this will be sent to other module for distinguishing which hotword is detected.
					file: "resources/models/smart_mirror.umdl",
					sensitivity: '0.5',
				},
				{
					hotwords: "snowboy",
					file: "resources/models/snowboy.umdl",
					sensitivity: '0.5',
				},
				{
					file: 'resources/models/jarvis.umdl',
					sensitivity: '0.8,0.80',
					hotwords: ['jarvis', 'jarvis'] //Kitt.ai changed their Jarvis UMDL, it has 2 models in one file. So weird.
					//anyway, you can give different name for each. ['jarvis_1', 'jarvis_2']. Even though I think this is useless.
				}
			],
			record: {
				sampleRate: 16000,      // audio sample rate
				threshold: 0.5,        // silence threshold (rec only)
				thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
				thresholdEnd: null,       // silence threshold to end recording, overrides threshold (rec only)
				silence: 1.0,        // seconds of silence before ending
				verbose: false,      // log info to the console. Use this when you want to check mic working or not.
				recordProgram: 'arecord',  // Defaults to 'arecord' - also supports 'rec' and 'sox'
				device: null        // recording device (e.g.: 'plughw:1')
			},
			autostart: true,              // if 'false', this module will wait for 'HOTWORD_RESUME' notification to start hotwords detection at the beginning.
			autorestart: false,          // You can set this 'true' when you want this module to go back to listening mode automatically again after hotword is detected. But use this carefully when your other modules are using microphone or speaker.

			// customizable notification trigger
			notifications: {
				PAUSE: "HOTWORD_PAUSE",
				RESUME: "HOTWORD_RESUME",
				LISTENING: "HOTWORD_LISTENING",
				SLEEPING: "HOTWORD_SLEEPING",
				ERROR: "HOTWORD_ERROR",
			},
			onDetected: {
				notification: (payload) => {
					return "HOTWORD_DETECTED"
				},
				payload: (payload) => {
					return payload
				}
			},
		}
	},
	{
		module: "Stock",
		position: "top_left",
		config: {}
	},
		// {
		// 	module: "weatherforecast",
		// 	position: "top_right",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		location: "New York",
		// 		locationID: "5128581", //ID from https://openweathermap.org/city
		// 		appid: "YOUR_OPENWEATHER_API_KEY"
		// 	}
		// },
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url:
		//                     "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true
		// 	}
		// }
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}