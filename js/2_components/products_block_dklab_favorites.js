document.addEventListener(
	"dkLabFavouriteProductsHeaderChanged",
	function () {
		let favoritesInHeader = document.querySelector("#header .navigation-buttons #dkLabFavHeaderWrapper");
		if (!favoritesInHeader) return;

		let headerTop = document.querySelector("#header .header-top");
		if (!headerTop) return;

		let favoritesHref = favoritesInHeader.querySelector("a");
		if (!favoritesHref) return;

		headerTop.appendChild(favoritesInHeader);
	},
	{ once: true }
);

document.addEventListener("dkLabFavouriteProductsHeaderChanged", function () {
	let favoritesInHeader = document.querySelector("#header #dkLabFavHeaderWrapper");
	if (!favoritesInHeader) return;

	let favoritesHref = favoritesInHeader.querySelector("a");
	if (!favoritesHref) return;

	const favoritesSpan = document.createElement("span");
	favoritesSpan.textContent = translationsStrings.favorites[activeLang];
	favoritesHref.prepend(favoritesSpan);

	let em = favoritesInHeader.querySelector("em");
	if (!em) {
		favoritesInHeader.classList.add("no-count");
	} else {
		favoritesInHeader.classList.remove("no-count");
	}
});
