document.addEventListener("luigiSearchDone", function () {
	if (document.querySelector("#lb-search-element")) {
		addCollapsedToAllFilters();
		moveFilters();
		fixKosikInVyhledavani();
	}
	removeActiveFromMobileSearchButton();
	removeClassesFromBody();

	function addCollapsedToAllFilters() {
		let filters = document.querySelectorAll(".lb-facet");
		filters.forEach(function (filter) {
			filter.classList.add("custom-collapsed");
			filter.addEventListener("click", function () {
				filter.classList.remove("custom-collapsed");
			});
		});
	}

	function moveFilters() {
		let filtersContainer = document.querySelector(".lb-search__aside");
		let targetContainer = document.querySelector(".lb-quick-searches");

		if (filtersContainer && targetContainer) {
			//move filters after target container
			targetContainer.parentNode.insertBefore(filtersContainer, targetContainer.nextSibling);
		}
	}

	function removeActiveFromMobileSearchButton() {
		let headerSearch = document.querySelector("#header .search");
		if (!headerSearch) return;
		headerSearch.classList.remove("active-mobile-search");
	}

	function removeClassesFromBody() {
		body.classList.remove("ordering-process");
	}

	document.querySelector("html").classList.remove("lb-lock-scroll");
	body.classList.add("in-luigi-vyhledavani");
});

document.addEventListener("DOMContentLoaded", function () {
	// Usage:
	let luigiAcElement = document.querySelector(".luigi-ac");
	if (luigiAcElement) {
		addMutationObserverToLuigi(luigiAcElement);
	} else {
		// wait for luigi-ac to be added
		const observer = new MutationObserver((mutations, obs) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === 1 && node.classList.contains("luigi-ac")) {
						addMutationObserverToLuigi(node);
						obs.disconnect(); // stop observing
					}
				});
			});
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	function addMutationObserverToLuigi(luigiAcElement) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === 1) {
						// Only element nodes
						if (node.classList.contains("luigi-ac-close")) {
							attachCloseHandler(node);
						}
						// Also check for any descendants with the class
						node.querySelectorAll?.(".luigi-ac-close").forEach(attachCloseHandler);
					}
				});
			});
		});

		function attachCloseHandler(luigiAcClose) {
			luigiAcClose.addEventListener("click", function () {
				let mobileSearchButton = document.querySelector(".mobile-search-button");
				if (mobileSearchButton) {
					mobileSearchButton.click();
				}
			});
		}

		observer.observe(luigiAcElement, {
			childList: true,
			subtree: true,
		});
	}
});

function fixKosikInVyhledavani() {
	let navigationButtons = document.querySelector("#header .navigation-buttons");
	if (!navigationButtons) {
		return;
	}
	if (navigationButtons.textContent.trim().length === 0) {
		console.log("Navigation buttons are empty, fixing cart icon in search.");
		const cartLink = document.createElement("a");
		cartLink.href = translationsStrings.kosikUrl[activeLang];
		cartLink.className = "btn btn-icon toggle-window cart-count full hovered";
		cartLink.dataset.target = "cart";
		cartLink.dataset.hover = "true";
		cartLink.dataset.redirect = "true";
		cartLink.dataset.testid = "headerCart";
		cartLink.rel = "nofollow";
		cartLink.setAttribute("aria-haspopup", "dialog");
		cartLink.setAttribute("aria-expanded", "false");
		cartLink.setAttribute("aria-controls", "cart-widget");

		navigationButtons.appendChild(cartLink);
		navigationButtons.style.setProperty("display", "flex", "important");
	}
}
