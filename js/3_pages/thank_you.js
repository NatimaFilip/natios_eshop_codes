if (body.classList.contains("id--15")) {
	thxOrder();
}

function thxOrder() {
	let thxElement = document.querySelector(".summary-thx");
	if (!thxElement) return;

	let h1Element = document.querySelector("h1");
	if (h1Element) {
		h1Element.insertAdjacentElement("beforebegin", thxElement);
	}
}
