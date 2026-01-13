document.addEventListener("luigiSearchDone", function () {
	if (document.querySelector("#lb-search-element")) {
		addCollapsedToAllFilters();
	}

	function addCollapsedToAllFilters() {
		let filters = document.querySelectorAll(".lb-facet");
		filters.forEach(function (filter) {
			filter.classList.add("lb-facet--collapsed");
		});
	}
});
