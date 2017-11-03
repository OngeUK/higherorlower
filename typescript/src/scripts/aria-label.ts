/** Build friendly ARIA labels **/

export default function ariaLabel(value, suit) {
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
	}

	return `${value} of ${suit}`;
}