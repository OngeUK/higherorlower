/** Entry point TypeScript file **/

// Register Service Worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("sw.js").then((registration: ServiceWorkerRegistration) => {
		// Registration was successful
			console.log("ServiceWorker registration successful");
		}, (err: Error) => {
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