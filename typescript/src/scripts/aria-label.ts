/** Build friendly ARIA labels **/

export default function ariaLabel(value: string, suit: string): string {
	// Set friendly names for picture cards
	switch (value) {
		case "j":
			value = "Jack";
			break;
		case "q":
			value = "Queen";
			break;
		case "k":
			value = "King";
			break;
		case "a":
			value = "Ace";
		default:
			value = null;
	}

	// Set friendly names for card suits
	switch (suit) {
		case "c":
			suit = "clubs";
			break;
		case "s":
			suit = "spades";
			break;
		case "d":
			suit = "diamonds";
			break;
		case "h":
			suit = "hearts";
		default:
			suit = null;
	}

	return `${value} of ${suit}`;
}