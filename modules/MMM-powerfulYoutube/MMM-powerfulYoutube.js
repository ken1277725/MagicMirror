/* Magic Mirror
 * Module: Embed Youtube
 *
 * v 1.3.3
 *
 * By Nitipoom Unrrom (aka nitpum) https://nitpum.com
 * MIT Licensed.
 */
Module.register("MMM-powerfulYoutube", {
	defaults: {
		autoplay: false,
		color: "red",
		controls: true,
		disablekb: false,
		fs: true,
		height: 315,
		width: 560,
		loop: false,
		modestbranding: false,
		rel: false,
		showinfo: false,
		video_id: "",
		playlist: "",
		video_list: []
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		if (this.config.videoId === "") {
			return wrapper;
		}

		function onYouTubeIframeAPIReady() { //此函數在IFrame Player API code 載入後將自動呼叫
			console.log("?!");
			wrapper = new YT.Player("wrapper", {
				videoId: this.config.videoId,
				height: this.config.height,
				width: this.config.width,
				allowfullscreen: "allowfullscreen",
				autoplay: this.config.autoplay
			});

		}

		var tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// new Promise((resolve, reject) => {

		//return wrapper;
		// console.log(player)
		// wrapper.appendChild(player);
	},
	socketNotificationReceived: function (notification, payload) {
		if (notification === "New_Video") {
			console.log("New_Video", payload.New_Video)
			this.config.video_id = payload.New_Video;
			this.updateDom(this.config.animationSpeed);
		} else if (notification === "Voice") {
			console.log("Voice", payload.Voice)
			this.Voice = payload.Voice;
			//this.updateDom(this.config.animationSpeed);
		}
	},

});