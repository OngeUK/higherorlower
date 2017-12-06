/* tslint:disable */
import {gameState} from "../src/scripts/scoring/game-state";

test("Increment counter", () => {
	// Store value of counter
	const counter = gameState.counter;

	// Increment counter
	gameState.incrementCounter();

	expect(gameState.counter).toBe(counter + 1);
});

test("Increment score", () => {
	// Store value of counter
	const score = gameState.score;

	// Increment score
	gameState.incrementScore();
	expect(gameState.score).toBe(score + 1);
});

test("Decrease lives", () => {
	// Store value of lives
	const lives = gameState.lives;

	// Increment score
	gameState.decreaseLives();
	expect(gameState.lives).toBe(lives - 1);
});

test("Set current value", () => {
	// Set the current card value to 123
	gameState.setCurrentCardValue(123);

	expect(gameState.currentCardValue).toBe(123);
});

test("Reset counter", () => {
	// Reset state
	gameState.reset();
	expect(gameState.counter).toBe(0);
});

test("Reset score", () => {
	// Reset state
	gameState.reset();

	expect(gameState.score).toBe(0);
});

test("Reset lives", () => {
	// Reset state
	gameState.reset();

	expect(gameState.lives).toBe(3);
});

test("Reset current value", () => {
	// Reset state
	gameState.reset();

	expect(gameState.currentCardValue).toBe(null);
});