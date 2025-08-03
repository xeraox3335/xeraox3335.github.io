/* Config Sample
*
* For more information on how you can configure this file
* see https://docs.magicmirror.builders/configuration/introduction.html
* and https://docs.magicmirror.builders/modules/configuration.html
*
* You can use environment variables using a `config.js.template` file instead of `config.js`
* which will be converted to `config.js` while starting. For more information
* see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
*/
let config = {
	address: "localhost",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "de",
	locale: "de-DE",   // this variable is provided as a consistent location
	// it is currently only used by 3rd party modules. no MagicMirror code uses this value
	// as we have no usage, we  have no constraints on what this field holds
	// see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	electronOptions: {
		fullscreen: true, // Set to true to start in fullscreen mode
		kiosk: true, // Set to true to start in kiosk mode
		x: -800,    // 2 × 1920px
		y: 0,       // oben ansetzen
		display: 2
	},


	modules: [
		{
			module: "MMM-Wallpaper",
			position: "fullscreen_below",
			config: { // See "Configuration options" for more information.
				source: "local:backgrounds",
				caption: false,
				fadeEdges: false,
				filter: "blur(10px) brightness(90%)",
			}
		},

		{
			/* Don't share your credentials! */
			module: "MMM-OnSpotify",
			position: "bottom_left", /* bottom_left, bottom_center */
			config: {
				clientID: "3f379e6bae6e4c23a7f71db0f114c9c5",
				clientSecret: "47b001fa746a478788e998d103c02052",
				accessToken: "BQDRE2Tyc4bsveKP6446C6c4ilMIvX-9UQmOsI3zv6mthLbdpXpBURTnd8O0s74O8PjBRSDzclbO7Jmtbj9oLZwyhHW3RdYJOk48mB0edVFI3t9yiIn1dK-QDHMyNTnJIOZ4XZs_ixAsDTrvolsuWv5fqVqLJK9VI2UHYgfcRzOPoMjmvqX9DYbipJgOgSzBkLrFXUYf9XfAIQboyW1upBO2hUlFnDj2tPW0F-Do6SQj9HZr1ypxxa284JHpPwV4Fw4u3JNkxw",
				refreshToken: "AQBT9NJ_RwhucNaS082-bofKeZ0Iw-wy6ixjGjTYwHVIFov2o0VGp7jvkWjme9wakZ0bDjFn-gAnq03P1w6ErXN23q1YytzxYkRq2izoApYsrvHvFfI3SvC_lBkbWwVQkyA",
				/* Add here your configurations */


				mediaAnimations: true,
				fadeAnimations: true,
				scrollAnimations: true,
				textAnimations: true,
				transitionAnimations: true,
				spotifyVectorAnimations: true,

				// Update Intervals
				isPlaying: 1,
				isEmpty: 2,
				isPlayingHidden: 2,
				isEmptyHidden: 4,
				onReconnecting: 4,
				onError: 8,
			}
		},
		{
			module: "clock",
			position: "top_right"
		},
		{
			module: "weather",
			position: "bottom_right",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				lat: 49.2402,
				lon: 6.9969
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
