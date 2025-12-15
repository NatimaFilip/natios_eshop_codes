/* document.addEventListener(
	"dkLabFavouriteProductsHeaderChanged",
	function () {
		let favoritesInHeader = document.querySelector("#header .navigation-buttons #dkLabFavHeaderWrapper");
		if (!favoritesInHeader) return;

		let headerTop = document.querySelector("#header .header-top");
		if (!headerTop) return;

		headerTop.appendChild(favoritesInHeader);
	},
	{ once: true }
); */

/*Zmena default pozice kam se umistuje doplnek*/
if (typeof dkLabOblibeneDataLayer !== "undefined") {
	dkLabOblibeneDataLayer.template.classic.selectors.headerIconAddBefore = "#header .header-top .site-name-wrapper";
	dkLabOblibeneDataLayer.template.classic.selectors.detailAddLinkDivAfter = ".p-image-wrapper .p-image .p-main-image";
}

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
