/** Build the visual representation of the card face **/

// Import JS modules
import {gameState as gs} from "./scoring/game-state";
import ariaLabel from "./aria-label";

export default function buildCardFace(value: number, suit: string, domElement: Element, zIndex: number = 0): void {
	// Define displayValue variable
	let displayValue: string | number;

	// Cache selectors
	const cardFace: Element = domElement.querySelector(".card__face"),
		aria: HTMLElement = document.getElementById("aria");

	// Set picture cards
	if (value > 10) {
		if (value === 11) { displayValue = "j"; } // Jack
		if (value === 12) { displayValue = "q"; } // Queen
		if (value === 13) { displayValue = "k"; } // King
		if (value === 14) { displayValue = "a"; } // Ace
	} else {
		displayValue = value;
	}

	// Add data attributes to card DOM element
	domElement.setAttribute("data-value", displayValue.toString()); // Card value
	domElement.setAttribute("data-suit", suit);	// Card suit
	domElement.setAttribute("style", `z-index: ${zIndex + 10};${cardAngles(zIndex)}`); // Card styling

	// Add ARIA label for card suit and value
	aria.textContent = ariaLabel(displayValue.toString(), suit);

	// Build card appearance
	if (value < 11) { // Number cards
		// Define symbols variable
		let suitSymbols: string = "";

		// Add as many symbols as the card requires
		// tslint:disable-next-line:no-increment-decrement
		for (let i: number = 0; i < value; i ++) {
			suitSymbols += `<div class="suit"></div>`;
		}

		// Add symbols markup to DOM
		cardFace.innerHTML = suitSymbols;
	}

	// Add current card value to the game state
	gs.setCurrentCardValue(value);
}

// Create random angle for laid cards
function cardAngles(zIndex: number): string {
	// Don't add an angle for the first card as it starts face down
	if (zIndex > 0) {
		return ` transform: rotate(${randomAngle()}deg) translate3d(${randomAngle()}%, ${randomAngle()}%, 0);`;
	}
	return ``;
}

// Create random number
function randomAngle(min: number = -1, max: number = 1): string {
	// tslint:disable-next-line:insecure-random
	return (Math.random() * (max - min) + min).toFixed(2);
}