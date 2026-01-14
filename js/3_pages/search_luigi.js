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
