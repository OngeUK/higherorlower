/** Display scoreboard content **/

// Import JS modules
import {gameState as gs} from "./game-state";

// Import SASS file
import "../../scss/scoreboard.scss";

export default function updateScoreBoard(): void {
	// Cache selectors
	const [score, lives] = [document.getElementById("score"), document.getElementById("lives")];

	// Animate scoreboard data change
	scoreboardPulsate(score, score.textContent, gs.score || 0);
	scoreboardPulsate(lives, lives.textContent, gs.lives || 3);

	// Update DOM
	score.textContent = gs.score.toString();
	lives.textContent = gs.lives.toString();
}

// Handle scoreboard pulsation animation
function scoreboardPulsate(el: Element, prev: string, next: number): void {
	if (prev !== next.toString()) {
		const className: string = "scoreboard__item_changed";

		// Add animation class
		el.classList.add(className);

		el.addEventListener("animationend", () => {
			// Once animation is over, remove animation class
			el.classList.remove(className);
		});
	}
}