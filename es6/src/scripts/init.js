/** Initialise game **/

// Import JS modules
import preloadImages from "./preload-images";
import buildCardFace from "./build-card-face";
import checkAnswer from "./scoring/check-answer";
import checkButtonOptions from "./button-management";
import {deck as d} from "./card-deck";

// Import SASS files
import "../scss/suits.scss";
import "../scss/gutters.scss";
import "../scss/card-values/2.scss";
import "../scss/card-values/3.scss";
import "../scss/card-values/4.scss";
import "../scss/card-values/5.scss";
import "../scss/card-values/6.scss";
import "../scss/card-values/7.scss";
import "../scss/card-values/8.scss";
import "../scss/card-values/9.scss";
import "../scss/card-values/10.scss";
import "../scss/card-values/j.scss";
import "../scss/card-values/q.scss";
import "../scss/card-values/k.scss";
import "../scss/card-values/a.scss";
import "../scss/card-values/picture-cards.scss";

// Initialise game
export default function init() {
	// Cache selectors
	const btnStart = document.getElementById("start"),
		cardBack = document.getElementById("back"),
		firstCard = document.getElementById("first-card"),
		buttons = document.querySelectorAll("[data-btn-type]"),
		scoreboard = document.getElementById("scoreboard"),
		controls = document.getElementById("controls"),
		controlsWrapper = document.getElementById("controls__wrapper");

	// Pre-load all picture cards
	preloadImages();

	// Build our deck
	d.buildDeck();

	// Get first card
	const card = d.deck.next().value;

	// Build first card's face
	buildCardFace(card.value, card.suit, firstCard);

	// Start button event listener
	btnStart.addEventListener("click", function startGame() {
		// Change classes to fire card flip animation
		cardBack.setAttribute("class", "card card_back card_back-hide");
		firstCard.setAttribute("class", "card card_up");

		// Check that higher and lower are valid options
		checkButtonOptions(card.value);

		// Fade out start button
		btnStart.setAttribute("style", "opacity: 0");

		// Change controls wrapper visibility, before firing transition
		controlsWrapper.setAttribute("style", "visibility: visible");

		// When first card transition ends
		firstCard.addEventListener("transitionend", function firstCard() {
			// Fade in game elements
			controlsWrapper.setAttribute("style", `${controlsWrapper.getAttribute("style")}; opacity: 1;`);
			scoreboard.setAttribute("style", "opacity: 1;");

			// Remove start button event listener
			btnStart.removeEventListener("click", startGame);

			// Remove first card event listener
			this.removeEventListener("transitionend", firstCard);

			// Delete start button from DOM
			controls.removeChild(btnStart);

			// Delete card back from DOM
			cardBack.parentNode.removeChild(cardBack);
		});
	});

	// Higher/Lower button event listeners
	[...buttons].forEach((button) => { // Convert to array as you can't use a ForEach loop on a nodelist in Edge
		button.addEventListener("click", checkAnswer);
	});
}