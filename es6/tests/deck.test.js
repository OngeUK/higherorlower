/* eslint-disable no-undef */
import {deck as d} from "../src/scripts/card-deck";
const shuffle = require("lodash/shuffle");

test("Build and shuffle deck", () => {
	// Build deck of cards
	d.buildDeck();

	// Extract deck from generator
	const deck = [];

	for (const card of d.deck) {
		deck.push(card);
	}

	// Create copy of deck
	const deckCopy = [...deck];

	expect(deck.length).toBe(52);				// 52 cards in a deck
	expect(deck).not.toBe(shuffle(deckCopy));	// Shuffled pack should not be same as unsuffled pack
});