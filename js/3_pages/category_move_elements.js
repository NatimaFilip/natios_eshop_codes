let perexTrimmedIsVisible;
function editCategory() {
	if (!body.classList.contains("type-category")) {
		return;
	}

	let categotyTop = document.querySelector(".category-top");
	let contentWrapperIn = document.querySelector(".content-wrapper-in");
	if (contentWrapperIn && categotyTop) {
		contentWrapperIn.prepend(categotyTop);
	}

	let breadcrumbsWrapper = document.querySelector(".breadcrumbs-wrapper");
	if (categotyTop && breadcrumbsWrapper) {
		categotyTop.prepend(breadcrumbsWrapper);
	}

	perexTrimmedIsVisible = false;
	if (isMobile) {
		trimPerex();
	}
}

editCategory();

document.addEventListener("ShoptetDOMContentLoaded", () => {
	let categoryTopInContent = document.querySelector("#content .category-top");
	if (categoryTopInContent) {
		categoryTopInContent.remove();
	}
});

function trimPerex() {
	const maxLength = 130;
	const perexElement = document.querySelector(".category-perex");
	if (!perexElement) return;

	const paragraphElement = perexElement.querySelector(":scope > p");
	if (!paragraphElement) return;

	let originalText = paragraphElement.textContent;
	originalText = originalText.replace(/\s+/g, " ").trim();

	if (originalText.length <= maxLength) {
		// If the text is already short enough, do nothing
		return;
	}
	perexElement.classList.add("category-perex-has-shortened");
	// Find the last full word within the maxLength
	let truncatedText = originalText.slice(0, maxLength);
	const lastSpaceIndex = truncatedText.lastIndexOf(" ");
	if (lastSpaceIndex !== -1) {
		truncatedText = truncatedText.slice(0, lastSpaceIndex);
	}

	const categoryPerexShortened = document.createElement("p");
	categoryPerexShortened.innerHTML = truncatedText;
	categoryPerexShortened.className = "category-perex-shortened";
	perexElement.appendChild(categoryPerexShortened);

	const readMoreButton = document.createElement("span");
	readMoreButton.className = "read-more-perex";

	readMoreButton.innerHTML = translationsStrings.more[activeLang];

	categoryPerexShortened.appendChild(readMoreButton);

	readMoreButton.addEventListener("click", function () {
		perexElement.classList.add("active");
		perexTrimmedIsVisible = true;
	});
	//make it so it trims after 3 lines and saves the rest of the text in a data attribute
}
