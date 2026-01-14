document.addEventListener("luigiSearchDone", function () {
	if (document.querySelector("#lb-search-element")) {
		addCollapsedToAllFilters();
		moveFilters();
	}

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

	document.querySelector("html").classList.remove("lb-lock-scroll");
	body.classList.add("in-luigi-vyhledavani");
});

document.addEventListener("DOMContentLoaded", function () {
	let luigiAcElement = document.querySelector(".luigi-ac");
	if (luigiAcElement) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.classList && node.classList.contains("luigi-ac-close")) {
						console.log("Luigi AC closed");
						let luigiAcClose = document.querySelector(".luigi-ac-close");
						if (luigiAcClose) {
							luigiAcClose.addEventListener("click", function () {
								let mobileSearchButton = document.querySelector(".mobile-search-button");
								if (mobileSearchButton) {
									mobileSearchButton.click();
								}
							});
						}
					}
				});
			});
		});

		observer.observe(luigiAcElement, {
			childList: true,
			subtree: true,
		});
	}
});
