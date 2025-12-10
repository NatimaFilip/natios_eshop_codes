document.addEventListener("ShoptetDOMContentLoaded", () => {
	addToggleToFiltersHeadings();
	selectedFilters();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	addToggleToFiltersHeadings();
	selectedFilters();
});

addToggleToFiltersHeadings();
selectedFilters();

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

function selectedFilters() {
	let existingSelectedFiltersWrapper = document.querySelector(".selected-filters-wrapper");
	if (existingSelectedFiltersWrapper) {
		existingSelectedFiltersWrapper.remove();
	}
	let clearFiltersBtn = document.querySelector("#clear-filters");

	if (!clearFiltersBtn) return;

	let allFilterSections = document.querySelectorAll("#filters .filter-section");
	const selectedFiltersWrapper = document.createElement("div");
	selectedFiltersWrapper.className = "selected-filters-wrapper";

	const selectedFiltersContent = document.createElement("div");
	selectedFiltersContent.className = "selected-filters-content";

	selectedFiltersWrapper.appendChild(selectedFiltersContent);

	//cena
	let sliderWrapper = document.querySelector("#filters .slider-wrapper");
	if (sliderWrapper) {
		let priceSlider = sliderWrapper.querySelector("#slider");
		let priceSliderRange = sliderWrapper.querySelector(".ui-slider-range");
		if (priceSlider && priceSliderRange && priceSliderRange.style.width !== "100%") {
			let minFilterValue = sliderWrapper.querySelector(".slider-header .from").textContent.trim();
			let maxFilterValue = sliderWrapper.querySelector(".slider-header .to").textContent.trim();

			minFilterValue = minFilterValue.replace(/  +/g, " ");
			maxFilterValue = maxFilterValue.replace(/  +/g, " ");

			console.log("minFilterValue", minFilterValue);
			console.log("maxFilterValue", maxFilterValue);

			const selectedFilterContainer = document.createElement("div");
			selectedFilterContainer.className = "selected-filter-container";

			const sliderHeader = sliderWrapper.querySelector("h4 > span");

			const selectedFilterHeading = document.createElement("div");
			selectedFilterHeading.className = "selected-filter-heading";
			selectedFilterHeading.textContent = sliderHeader.textContent;
			selectedFilterContainer.appendChild(selectedFilterHeading);

			const selectedFiltersList = document.createElement("div");
			selectedFiltersList.className = "selected-filters-list";

			const selectedFilterItem = document.createElement("div");
			selectedFilterItem.className = "selected-filter-item";
			selectedFilterItem.classList.add("price-range-item");
			selectedFilterItem.textContent = `${minFilterValue} - ${maxFilterValue}`;

			selectedFiltersList.appendChild(selectedFilterItem);
			selectedFilterContainer.appendChild(selectedFiltersList);
			selectedFiltersContent.appendChild(selectedFilterContainer);
		}
	}

	//parametry
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
		selectedFiltersContent.appendChild(selectedFilterContainer);
	});

	const selectedFiltersHeading = document.createElement("div");
	selectedFiltersHeading.className = "selected-filters-heading";
	selectedFiltersHeading.textContent = translationsStrings.selectedFilters[activeLang];
	selectedFiltersContent.prepend(selectedFiltersHeading);

	selectedFiltersContent.appendChild(clearFiltersBtn);
	let filtersWrapper = document.querySelector(".filters-wrapper");
	if (filtersWrapper) {
		filtersWrapper.appendChild(selectedFiltersWrapper);
	}
}
