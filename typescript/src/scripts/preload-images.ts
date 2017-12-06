/** Pre-load all picture card images **/

export default async function preloadImages(): Promise<void> {
	// Number of images loaded variable
	let loaded: number = 0;

	// Initials identify the card suits, manually add ace of spades
	const [values, suits, pictureCards] = [["jack", "queen", "king"], ["c", "s", "d", "h"], ["ace-s"]];

	// Build array of our picture cards
	values.forEach((value: string) => {
		suits.forEach((suit: string) => {
			pictureCards.push(`${value}-${suit}`);
		});
	});

	// Declare consts
	const len: number = pictureCards.length, // Get array length
		btnStart: HTMLElement = document.getElementById("start"),
		progress: HTMLElement = document.getElementById("controls__progress"),
		progressBar: HTMLElement = document.getElementById("controls__progress-bar");

	// Promise.all requires as array of promises, so build that here
	const toLoad: any = async (pictureCards: Promise<{}>): Promise<{}> => {
		return new Promise((resolve: Function, reject: Function): void => {
			// Create new image
			const img: HTMLImageElement = new Image();

			// When image has loaded
			img.onload = (): void => {
				// Resolve the promise with the image URL
				resolve(pictureCards);

				// Increment number of images loaded
				loaded = loaded + 1;

				// What percent loaded this image represents
				const percentLoaded: number = (loaded / len) * 100;

				// Update progress bar
				progressBar.setAttribute("style", `width: ${percentLoaded}%`);
			};

			// Problem loading image
			img.onerror = (err: ErrorEvent): void => {
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