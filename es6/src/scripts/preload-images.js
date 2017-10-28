/** Pre-load all picture card images **/

export default function preloadImages() {
	// Number of images loaded variable
	let loaded = 0;

	// Initials identify the card suits, manually add ace of spades
	const [values, suits, pictureCards] = [["jack", "queen", "king"], ["c", "s", "d", "h"], ["ace-s"]];

	// Build array of our picture cards
	values.forEach((value) => {
		suits.forEach((suit) => {
			pictureCards.push(`${value}-${suit}`);
		});
	});

	// Declare consts
	const len = pictureCards.length, // Get array length
		btnStart = document.getElementById("start"),
		progress = document.getElementById("controls__progress"),
		progressBar = document.getElementById("controls__progress-bar");

	// Promise.all requires as array of promises, so build that here
	const toLoad = (pictureCards) => {
		return new Promise((resolve, reject) => {
			// Create new image
			const img = new Image();

			// When image has loaded
			img.onload = () => {
				// Resolve the promise with the image URL
				resolve(pictureCards);

				// Increment number of images loaded
				loaded++;

				// What percent loaded this image represents
				const percentLoaded = (loaded / len) * 100;

				// Update progress bar
				progressBar.setAttribute("style", `width: ${percentLoaded}%`);
			};

			// Problem loading image
			img.onerror = (err) => {
				reject(err);
			};

			// Add image source
			img.src = `images/${pictureCards}.svg`;
		});
	};

	// Pre-load all images
	return Promise.all(pictureCards.map(toLoad)).then(() => {
		btnStart.removeAttribute("style"); // Show start button
		progress.parentNode.removeChild(progress); // Delete progress indicator from DOM
	}).catch(() => {
		// Basic error message to user
		alert("There was a problem loading the game.\nPlease try again later");
		progress.parentNode.removeChild(progress); // Delete progress indicator from DOM
	});
}