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

	if (isSmallTablet) {
		dkLabOblibeneDataLayer.template.classic.selectors.headerIconAddBefore =
			"#header .menu-helper .menu-level-1 > li:first-of-type";
	}

	dkLabOblibeneDataLayer.template.classic.selectors.detailAddLinkDivAfter = ".p-image-wrapper .p-image";

	const imageCarouselWrapper = document.querySelector(".image-carousel-wrapper");
	if (imageCarouselWrapper) {
		dkLabOblibeneDataLayer.template.classic.selectors.detailAddLinkDivAfter =
			".p-image-wrapper .p-image .image-carousel-wrapper";
	}

	if (body.classList.contains("type-product")) {
		document.addEventListener("dkLabFavouriteProductsHeaderChanged", function () {
			const favoritesInInfoWrapper = document.querySelector(".p-info-wrapper > .dkLabFavouriteDiv");
			if (favoritesInInfoWrapper) {
				const appendFavouritesToThis = document.querySelector(".p-image-wrapper .p-image");
				if (appendFavouritesToThis) {
					appendFavouritesToThis.appendChild(favoritesInInfoWrapper);
				}
			}
		});
	}

	document.addEventListener("debouncedResize", function () {
		dkLabOblibeneDataLayer.template.classic.selectors.headerIconAddBefore = "#header .header-top .site-name-wrapper";

		if (!isSmallTablet) {
			let existingFavInHeader = document.querySelector("#header .menu-helper .menu-level-1 #dkLabFavHeaderWrapper");
			if (existingFavInHeader) {
				let headerTop = document.querySelector("#header .header-top");
				if (!headerTop) return;
				headerTop.prepend(existingFavInHeader);
			}
		}

		if (isSmallTablet) {
			dkLabOblibeneDataLayer.template.classic.selectors.headerIconAddBefore =
				"#header .menu-helper .menu-level-1 > li:first-of-type";

			let existingFavInHeader = document.querySelector(".header-top #dkLabFavHeaderWrapper");
			if (existingFavInHeader) {
				let menuLevel1 = document.querySelector("#header .menu-helper .menu-level-1");
				if (!menuLevel1) return;
				menuLevel1.prepend(existingFavInHeader);
			}
		}
	});
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
