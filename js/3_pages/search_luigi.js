document.addEventListener("luigiSearchDone", function () {
	if (document.querySelector("#lb-search-element")) {
		addCollapsedToAllFilters();
		moveFilters();
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
		console.log("--------------------------prošel - neexistuje luigi ac");
		// wait for luigi-ac to be added
		const observer = new MutationObserver((mutations, obs) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === 1 && node.classList.contains("luigi-ac")) {
						console.log("--------------------------prošel 0 - existuje luigi ac");
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
		console.log("--------------------------prošel 1");
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				console.log("--------------------------prošel 2");
				mutation.addedNodes.forEach((node) => {
					console.log("--------------------------prošel 3 - node");
					if (node.nodeType === 1) {
						// Only element nodes
						if (node.classList.contains("luigi-ac-close")) {
							console.log("--------------------------prošel 4 - existuje close");
							attachCloseHandler(node);
						}
						// Also check for any descendants with the class
						node.querySelectorAll?.(".luigi-ac-close").forEach(attachCloseHandler);
					}
				});
			});
		});

		function attachCloseHandler(luigiAcClose) {
			console.log("Luigi AC closed");
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
