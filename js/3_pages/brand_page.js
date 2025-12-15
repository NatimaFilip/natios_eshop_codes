if (body.classList.contains("in-o-znacce-natios")) {
	copyCategoriesToBrandPage();
}
function copyCategoriesToBrandPage() {
	const categoriesSection = document.querySelector("#natios-categories");
	let categoryFromHeader = document.querySelectorAll("#header .menu-level-2");
	if (!categoriesSection || !categoryFromHeader || categoryFromHeader.length === 0) {
		return;
	}

	let categoryCopy = categoryFromHeader[0].cloneNode(true);
	categoriesSection.appendChild(categoryCopy);
	let menusLevelThree = categoryCopy.querySelectorAll(".menu-level-3");
	if (!menusLevelThree || menusLevelThree.length === 0) {
		return;
	}
	menusLevelThree.forEach((ul) => {
		ul.remove();
	});

	let arrowSectionDown = document.querySelector(".arrow-section-down");
	if (arrowSectionDown) {
		let secondSection = document.querySelector(".brand-page .full-width-wrapper:nth-of-type(2)");
		if (secondSection) {
			arrowSectionDown.addEventListener("click", () => {
				secondSection.scrollIntoView({ behavior: "smooth" });
			});
		}
	}
}
