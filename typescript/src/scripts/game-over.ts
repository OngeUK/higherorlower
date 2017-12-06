/** Game over and replay functionality */

// Import JS & SASS modules
import {gameState as gs} from "./scoring/game-state";
import {deck as d} from "./card-deck";
import buildCardFace from "./build-card-face";
import updateScoreBoard from "./scoring/scoreboard";
import checkButtonOptions from "./button-management";
import "../scss/game-over.scss";

// tslint:disable-next-line:max-func-body-length
export default function gameOver(): void {
	// Cache selectors
	const scoreboard: HTMLElement = document.getElementById("scoreboard"),
		controls: HTMLElement = document.getElementById("controls__wrapper"),
		deckWrapper: HTMLElement = document.getElementById("deck-wrapper"),
		gameOver: HTMLElement = document.getElementById("game-over"),
		aria: HTMLElement = document.getElementById("aria");

	// Update highest score, where applicable
	if (gs.score >= gs.best) {
		gs.updateBestScore(gs.score);
	}

	// Hide scoreboard and game controls
	scoreboard.setAttribute("style", "opacity: 0; transition-delay: 500ms");
	controls.setAttribute("style", "opacity: 0; visibility: visible");

	// Pick up deck
	deckWrapper.setAttribute("class", `${deckWrapper.getAttribute("class")} deck-wrapper_up`);
	deckWrapper.setAttribute("style", "will-change: transition, opacity; transition-delay: 1000ms");

	// Update ARIA live content
	aria.innerHTML = "Game over";

	// Reset deck wrapper once transition is over
	deckWrapper.addEventListener("transitionend", function reset(e: TransitionEvent): void {
		if (e.propertyName === "opacity") {
			// Remove event listener
			deckWrapper.removeEventListener("transitionend", reset);

			// Remove all played cards from DOM
			deckWrapper.innerHTML = "";

			// Add slight delay to prevent Edge bug where deck reappears for a split second
			setTimeout(() => {
				// Remove inline styles added to fire transitions
				deckWrapper.removeAttribute("style");

				// Remove additional class added to fire transitions
				deckWrapper.setAttribute("class", "deck-wrapper");
			}, 100);
		}
	});

	// Build and display game over message
	gameOver.setAttribute("style", "z-index: 1");
	gameOver.innerHTML = `
		<div class="game-over__header">Game over!</div>
		<div class="game-over__info">
			You scored <span class="game-over__info_digit">${gs.score}</span>
		</div>
		<div class="game-over__info">
			Your best score <span class="game-over__info_digit">${gs.best}</span>
		</div>
		<button id="replay" class="controls__btn controls__btn_replay" type="button">
			<span class="controls__btn-label">Replay</span>
		</button>
	`;

	// Cache selector
	const btnReplay: HTMLElement = document.getElementById("replay");

	// Replay game
	btnReplay.addEventListener("click", function replay(): void {
		// Remove replay button event listener
		btnReplay.removeEventListener("click", replay);

		// Cache selector
		const buttons: Element[] = Array.from(document.querySelectorAll("[data-btn-type]"));

		// Re-enable game controls
		buttons.forEach((button: Element) => { // Convert to array as you can't use a ForEach loop on a nodelist in Edge
			button.removeAttribute("disabled");
		});

		// Reset game state
		gs.reset();

		// Update scoreboard
		updateScoreBoard();

		// Build new deck
		d.buildDeck();

		// TypeScript interface
		interface Card {
			value: number;
			suit: string;
		}

		// Get first card of new deck
		const card: Card = d.deck.next().value;

		// Check that higher and lower are valid options
		checkButtonOptions(card.value);

		// Reset deck wrapper
		deckWrapper.innerHTML = `
			<div id="first-card" class="card">
				<div class="card__wrapper card_lay">
					<div class="card__face"></div>
				</div>
			</div>
		`;

		// Cache selector
		const firstCard: HTMLElement = document.getElementById("first-card");

		// Build first card's face
		buildCardFace(card.value, card.suit, firstCard);

		// setTimeout needed for transitions to fire
		setTimeout(() => {
			// Remove card_lay class to fire card laying animation
			firstCard.children[0].className = "card__wrapper";

			// Once animation is complete
			firstCard.addEventListener("transitionend", function animateIn(): void {
				// Remove event listener
				firstCard.removeEventListener("transitionend", animateIn);

				// Clear game over data
				gameOver.removeAttribute("style");
				gameOver.innerHTML = "";
			});
		}, 100);

		// Show scoreboard
		scoreboard.setAttribute("style", "opacity: 1; transition-delay: 600ms");

		// Show controls
		controls.setAttribute("style", "opacity: 1; visibility: visible;  transition-delay: 600ms");
	});
}