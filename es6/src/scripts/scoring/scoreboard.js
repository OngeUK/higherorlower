/** Display scoreboard content **/

// Import JS modules
import {gameState as gs} from "./game-state";

// Import SASS file
import "../../scss/scoreboard.scss";

export default function updateScoreBoard() {
	// Cache selectors
	const [score, lives] = [document.getElementById("score"), document.getElementById("lives")];

	// Update DOM
	score.textContent = gs.score;
	lives.textContent = gs.lives;
}