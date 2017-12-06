/** Game button management **/

// Disable buttons for highest and lowest value cards
export default function checkButtonOptions(nextCardValue: number): void {
	const [btnHigher, btnLower] = [document.querySelector("[data-btn-type='+']"), document.querySelector("[data-btn-type='-']")];

	// Card value is 2, then disable lower button
	if (nextCardValue === 2) {
		btnLower.setAttribute("disabled", "disabled");
		btnLower.setAttribute("data-disabled", "1");
	} else {
		btnLower.removeAttribute("disabled");
		btnLower.removeAttribute("data-disabled");
	}

	// Card value is ace, then disable higher button
	if (nextCardValue === 14) {
		btnHigher.setAttribute("disabled", "disabled");
		btnHigher.setAttribute("data-disabled", "1");
	} else {
		btnHigher.removeAttribute("disabled");
		btnHigher.removeAttribute("data-disabled");
	}
}