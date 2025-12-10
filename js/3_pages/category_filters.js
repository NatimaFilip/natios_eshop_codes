function addToggleToFiltersHeadings() {
	if (!body.classList.contains("type-category")) {
		return;
	}

	let filters = document.querySelector("#filters");
	if (!filters) return;

	let headings = filters.querySelectorAll("h4");
	if (!headings || headings.length === 0) return;

	headings.forEach((heading) => {
		addToggle(heading);
	});

	function addToggle(heading) {
		heading.addEventListener("click", () => {
			headings.forEach((h) => {
				if (h !== heading) {
					h.parentElement.classList.remove("expanded");
				}
			});
			heading.parentElement.classList.toggle("expanded");
		});
	}
}

addToggleToFiltersHeadings();

function selectedFilters() {
	let clearFiltersBtn = document.querySelector("#clear-filters");

	if (!clearFiltersBtn) return;

	let allFilterSections = document.querySelectorAll("#filters .filter-section");
	const selectedFiltersWrapper = document.createElement("div");
	selectedFiltersWrapper.className = "selected-filters-wrapper";

	allFilterSections.forEach((section) => {
		let selectedInput = section.querySelectorAll("input[type='checkbox']:checked");
		if (selectedInput.length === 0) return;

		let filterHeading = section.querySelector("h4");
		if (!filterHeading) return;

		const selectedFilterContainer = document.createElement("div");
		selectedFilterContainer.className = "selected-filter-container";

		const selectedFilterHeading = document.createElement("div");
		selectedFilterHeading.className = "selected-filter-heading";
		selectedFilterHeading.textContent = filterHeading.textContent;
		selectedFilterContainer.appendChild(selectedFilterHeading);

		const selectedFiltersList = document.createElement("div");
		selectedFiltersList.className = "selected-filters-list";
		selectedInput.forEach((input) => {
			let label = input.parentElement.querySelector("label");
			if (!label) return;

			const selectedFilterItem = document.createElement("div");
			selectedFilterItem.className = "selected-filter-item";

			selectedFilterItem.textContent = label.childNodes[0].textContent.trim(); //textContent without .filter-count inside label

			selectedFilterItem.addEventListener("click", () => {
				input.click();
			});

			selectedFiltersList.appendChild(selectedFilterItem);
		});
		selectedFilterContainer.appendChild(selectedFiltersList);
		selectedFiltersWrapper.appendChild(selectedFilterContainer);
	});
	let categoryTop = document.querySelector(".category-top");
	if (categoryTop) {
		categoryTop.appendChild(selectedFiltersWrapper);
	}
}

selectedFilters();
