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
