/** Game state **/

interface GameState {
	counter: number;
	score: number;
	lives: number;
	best: number;
	currentCardValue: number;
	incrementCounter: Function;
	incrementScore: Function;
	decreaseLives: Function;
	setCurrentCardValue: Function;
	updateBestScore: Function;
	reset: Function;
}

export let gameState: GameState = {
	counter: 0,
	score: 0,
	lives: 3,
	best: localStorage.bestScore || 0,
	currentCardValue: null,

	// Increment move counter
	incrementCounter(): void {
		this.counter = this.counter + 1;
	},

	// Increment player's score
	incrementScore(): void {
		this.score = this.score + 1;
	},

	// Reduce player's remaining lives
	decreaseLives(): void {
		this.lives = this.lives - 1;
	},

	// Set the current card value
	setCurrentCardValue(value: number): void {
		this.currentCardValue = value;
	},

	// Store best score in localStorage
	updateBestScore(value: number): void {
		localStorage.setItem("bestScore", value.toString());
		this.best = localStorage.bestScore;
	},

	// Reset on replay
	reset(): void {
		this.counter = 0;
		this.score = 0;
		this.lives = 3;
		this.currentCardValue = null;
	}
};