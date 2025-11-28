/* document.addEventListener(
	"dkLabProductComparerHeaderChanged",
	function () {
		let compareInHeader = document.querySelector("#header .navigation-buttons #dkLabComparerHeaderWrappper");
		if (!compareInHeader) return;

		let headerTop = document.querySelector("#header .header-top");
		if (!headerTop) return;

		let compareInHeaderCopy = compareInHeader.cloneNode(true);

		try {
			compareInHeaderCopy.id = compareInHeaderCopy.id + "Copy";
			compareInHeaderCopy.className = compareInHeaderCopy.className + " copy";

			let childSpan = compareInHeaderCopy.querySelector("span");
			childSpan.id = childSpan.id + "Copy";
			childSpan.className = childSpan.className + " copy";
		} catch (e) {
			console.warn("Error cloning compareInHeader:");
			console.warn(e);
		}

		headerTop.appendChild(compareInHeaderCopy);
	},
	{ once: true }
);

document.addEventListener("dkLabProductComparerHeaderChanged", function () {
	let compareInHeaderCopy = document.querySelector("#header #dkLabComparerHeaderWrappperCopy");
	if (!compareInHeaderCopy) return;

	let compareBtnCopy = compareInHeaderCopy.querySelector(".dkLabComparerHeaderIconBtn.copy");
	if (!compareBtnCopy) return;

	let compareSpan = compareInHeaderCopy.querySelector(".dkLabComparerHeaderText");
	if (!compareSpan) {
		compareSpan = document.createElement("span");
		compareSpan.className = "dkLabComparerHeaderText";
		compareSpan.textContent = translationsStrings.compare[activeLang];
		compareBtnCopy.prepend(compareSpan);
	}

	let em = document.querySelector("#header #dkLabComparerHeaderWrappper em");
	let emCopy = compareInHeaderCopy.querySelector("em");
	if (!em) {
		compareInHeaderCopy.classList.add("no-count");
		if (emCopy) {
			emCopy.remove();
		}
		return;
	} else {
		compareInHeaderCopy.classList.remove("no-count");
		if (emCopy) {
			emCopy.textContent = em.textContent;
		}
		if (!emCopy) {
			emCopy = document.createElement("em");
			emCopy.textContent = em.textContent;
			compareInHeaderCopy.appendChild(emCopy);
		}
	}
});
 */
