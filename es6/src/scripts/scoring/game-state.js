/** Game state **/

export let gameState = {
	counter: 0,
	score: 0,
	lives: 3,
	best: localStorage.bestScore || 0,
	currentCardValue: null,

	// Increment move counter
	incrementCounter() {
		this.counter++;
	},

	// Increment player's score
	incrementScore() {
		this.score++;
	},

	// Reduce player's remaining lives
	decreaseLives() {
		this.lives--;
	},

	// Set the current card value
	setCurrentCardValue(value) {
		this.currentCardValue = value;
	},

	// Store best score in localStorage
	updateBestScore(value) {
		localStorage.setItem("bestScore", value);
		this.best = localStorage.bestScore;
	},

	// Reset on replay
	reset() {
		this.counter = 0;
		this.score = 0;
		this.lives = 3;
		this.currentCardValue = null;
	}
};