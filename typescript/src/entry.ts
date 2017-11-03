/** Entry point TypeScript file **/

// TO DO - get linting to work
// TO DO - add AT loader to process ts files
// TO DO - Update all code to TS specifications
// TO DO - get serve working
// TO DO - get build working

// Register Service Worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker.register("sw.js").then(function(registration) {
		// Registration was successful
			console.log("ServiceWorker registration successful with scope: ", registration.scope);
		}, function(err) {
		// registration failed :(
			console.log("ServiceWorker registration failed: ", err);
		});
	});
}

// Import JS modules
import init from "./scripts/init";

// Import initial state SASS files
import "./scss/core.scss";
import "./scss/card.scss";
import "./scss/controls.scss";

// Import assets so these get bundled by Webpack
import "./../../assets/icon-logo.png";
import "./../../assets/banner-logo.png";
import "./manifest.json";

// When in development/serve, require HTML file
if (process.env.NODE_ENV !== "production") {
	require("./index.html");
}

// Initialise game
init();