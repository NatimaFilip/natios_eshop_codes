document.addEventListener(
	"dkLabProductComparerHeaderChanged",
	function () {
		let compareInHeader = document.querySelector("#header .navigation-buttons #dkLabComparerHeaderWrappper");
		if (!compareInHeader) return;

		let headerTop = document.querySelector("#header .header-top");
		if (!headerTop) return;

		headerTop.appendChild(compareInHeader);
	},
	{ once: true }
);

document.addEventListener("dkLabProductComparerHeaderChanged", function () {
	let compareInHeader = document.querySelector("#header #dkLabComparerHeaderWrappper.copy");
	if (!compareInHeader) return;

	let compareBtn = compareInHeader.querySelector(".dkLabComparerHeaderIconBtn");
	if (!compareBtn) return;

	const compareSpan = document.createElement("span");
	compareSpan.textContent = translationsStrings.compare[activeLang];
	compareBtn.prepend(compareSpan);

	let em = compareInHeader.querySelector("em");
	if (!em) {
		compareInHeader.classList.add("no-count");
	} else {
		compareInHeader.classList.remove("no-count");
	}
});
