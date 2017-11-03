/** Build the visual representation of the card face **/

// Import JS modules
import {gameState as gs} from "./scoring/game-state";
import ariaLabel from "./aria-label";

export default function buildCardFace(value, suit, domElement, zIndex = 0) {
	// Define displayValue variable
	let displayValue;

	// Cache selectors
	const cardFace = domElement.querySelector(".card__face"),
		aria = document.getElementById("aria");

	// Set picture cards
	if (value > 10) {
		if (value === 11) displayValue = "j"; // Jack
		if (value === 12) displayValue = "q"; // Queen
		if (value === 13) displayValue = "k"; // King
		if (value === 14) displayValue = "a"; // Ace
	} else {
		displayValue = value;
	}

	// Add data attributes to card DOM element
	domElement.setAttribute("data-value", displayValue); // Card value
	domElement.setAttribute("data-suit", suit);	// Card suit
	domElement.setAttribute("style", `z-index: ${zIndex + 10};${cardAngles(zIndex)}`); // Card styling

	// Add ARIA label for card suit and value
	aria.textContent = ariaLabel(displayValue, suit);

	// Build card appearance
	if (value < 11) { // Number cards
		// Define symbols variable
		let suitSymbols = "";

		// Add as many symbols as the card requires
		for (let i = 0; i < value; i ++) {
			suitSymbols += `<div class="suit"></div>`;
		}

		// Add symbols markup to DOM
		cardFace.innerHTML = suitSymbols;
	}

	// Add current card value to the game state
	gs.setCurrentCardValue(value);
}

// Create random angle for laid cards
function cardAngles(zIndex) {
	// Don't add an angle for the first card as it starts face down
	if (zIndex > 0) {
		return ` transform: rotate(${randomAngle()}deg) translate3d(${randomAngle()}%, ${randomAngle()}%, 0);`;
	}
	return ``;
}

// Create random number
function randomAngle(min = -1, max = 1) {
	return (Math.random() * (max - min) + min).toFixed(2);
}