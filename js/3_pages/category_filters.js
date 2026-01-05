document.addEventListener("ShoptetDOMContentLoaded", () => {
	addToggleToFiltersHeadings();
	selectedFilters();
	listingSortingControls();
	addFilterToggleForMobile();
	showAmountOfProducts();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	addToggleToFiltersHeadings();
	selectedFilters();
	listingSortingControls();
	addFilterToggleForMobile();
});

addToggleToFiltersHeadings();
selectedFilters();
listingSortingControls();
addFilterToggleForMobile();
showAmountOfProducts();

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

function listingSortingControls() {
	let listingControls = document.querySelector(".listSorting__controls");
	if (!listingControls) return;

	let listingControlsLi = listingControls.querySelectorAll("li");
	if (!listingControlsLi || listingControlsLi.length === 0) return;

	listingControlsLi.forEach((li) => {
		let activeButton = li.querySelector(".listSorting__control--current");
		if (activeButton) {
			li.classList.add("active");
			li.addEventListener("click", () => {
				listingControls.classList.toggle("active");
			});
		}
	});
}

function addFilterToggleForMobile() {
	let filters = document.querySelector("#filters");
	if (!filters) return;

	let filterToggleBtn = document.createElement("div");
	filterToggleBtn.className = "custom-filter-toggle-btn";
	filterToggleBtn.textContent = translationsStrings.customFilterButton[activeLang];

	filters.prepend(filterToggleBtn);

	filterToggleBtn.addEventListener("click", () => {
		filters.classList.toggle("active");
	});
}

function showAmountOfProducts() {
	let allProductsSAP = document.querySelectorAll(".product");
	if (!allProductsSAP || allProductsSAP.length === 0) return;

	const amountOfProducts = allProductsSAP.length;

	let categoryHeaderInsideDiv = document.querySelector("#category-header > .listItemsTotal");
	if (!categoryHeaderInsideDiv) return;

	if (document.querySelector(".amount-of-products")) {
		document.querySelector(".amount-of-products").remove();
	}

	const amountOfProductsSpan = document.createElement("span");
	amountOfProductsSpan.className = "amount-of-products";
	amountOfProductsSpan.textContent = amountOfProducts.toString() + " " + translationsStrings.outOf[activeLang];

	categoryHeaderInsideDiv.prepend(amountOfProductsSpan);
}
