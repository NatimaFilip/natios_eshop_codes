function updatePageTitle() {
	if (csLang) {
		return;
	}
	if (
		document.body.classList.contains("type-category") ||
		document.body.classList.contains("type-manufacturer-detail") ||
		document.body.classList.contains("type-page")
	) {
		let h1 = $("h1").first();
		let title = document.title;
		// If the first h1 isn't equal to the page title,
		if (h1.text() !== title) {
			// Change h1 to page title but remove " - Natios" or " | Natios" if it's in there
			title = title.replace(/ - Natios| - natios| \| Natios| \| natios/g, "");
			h1.text(title);
		}
	}
}
updatePageTitle();
