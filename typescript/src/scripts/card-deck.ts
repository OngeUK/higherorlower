/** Create card deck **/
const shuffle: Function = require("lodash/shuffle");

interface Deck {
	deck: Generator;
	buildDeck: Function;
}

export let deck: Deck = {
	deck: null,

	// Build card deck
	buildDeck(): void {
		// - Initials identify the card suits
		// - Ace is high (cardValue of 14)
		const [suits, cardValue] = [["s", "c", "h", "d"], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]];
		let deck: {}[] = [];

		// Build deck array to have all 52 cards
		for (const suit of suits) {
			for (const card of cardValue) {
				deck.push({
					value: card,
					suit: suit
				});
			}
		}

		// Shuffle the deck
		deck = shuffle(deck);

		// Card deck generator
		function* deckGenerator(): Generator {
			for (const card of deck) {
				yield card;
			}
		}

		// Set deck value
		this.deck = deckGenerator();
	}
};