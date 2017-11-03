/** Check given answer to see if it is correct **/

// Import JS modules
import {gameState as gs} from "./game-state";
import {deck as d} from "../card-deck";
import buildCardFace from "../build-card-face";
import updateScoreBoard from "./scoreboard";
import gameOver from "../game-over";
import checkButtonOptions from "../button-management";


export default function checkAnswer(e) {
	// Cache selector
	const buttons = document.querySelectorAll("[data-btn-type]");

	// Disable buttons (to prevent click spamming)
	[...buttons].forEach((button) => { // Convert to array as you can't use a ForEach loop on a nodelist in Edge
		button.setAttribute("disabled", "disabled");
	});

	// Increment counter - this is used for new card z-indexing
	gs.incrementCounter();

	// Get next card from generator
	const nextCard = d.deck.next().value;

	// Store which button was pressed
	const btnPressed = e.target.dataset.btnType;

	// Work out if player's answer is correct
	if (btnPressed === "+") { // Clicked Higher
		(nextCard.value >= gs.currentCardValue) ? gs.incrementScore() : gs.decreaseLives();
	} else { // Clicked Lower
		(nextCard.value <= gs.currentCardValue) ? gs.incrementScore() : gs.decreaseLives();
	}

	// Cache selector
	const deckWrapper = document.getElementById("deck-wrapper");

	// Create next card DOM element
	const nextCardDOM = document.createElement("div");

	// Add classes and child elements
	nextCardDOM.setAttribute("class", "card card_stacked");
	nextCardDOM.innerHTML = `
		<div class="card__wrapper card_lay">
			<div class="card__face"></div>
		</div>
	`;

	// Add next card to DOM
	deckWrapper.appendChild(nextCardDOM);

	// Build card face of the next card to show
	buildCardFace(nextCard.value, nextCard.suit, nextCardDOM, gs.counter);

	// setTimeout needed for transitions to fire
	setTimeout(() => {
		// Remove card_lay class to fire card laying animation
		nextCardDOM.children[0].className = "card__wrapper";

		// Once card transition is over
		nextCardDOM.addEventListener("transitionend", function showCard(e) {
			if (e.propertyName.includes("transform")) { // propertyName in Edge is -webkit-transform, surprisingly
				// Update scoreboard
				updateScoreBoard();

				// Remove eventlistener on played card
				nextCardDOM.removeEventListener("transitionend", showCard);

				// If player is out of lives or all cards have been played
				if (!gs.lives || gs.counter === 51) {
					gameOver();
				} else {
					// Re-enable game controls
					[...buttons].forEach((button) => { // Convert to array as you can't use a ForEach loop on a nodelist in Edge
						button.removeAttribute("disabled");
					});

					// Check that higher and lower are valid options
					checkButtonOptions(nextCard.value);
				}
			}
		});
	}, 100);
}