function editCategory() {
	if (!body.classList.contains("type-category")) {
		return;
	}
	let contentWrapperIn = document.querySelector(".content-wrapper-in");
	let categotyTop = document.querySelector(".category-top");
	if (contentWrapperIn && categotyTop) {
		contentWrapperIn.prepend(categotyTop);
	}

	let breadcrumbsWrapper = document.querySelector(".breadcrumbs-wrapper");
	if (categotyTop && breadcrumbsWrapper) {
		categotyTop.prepend(breadcrumbsWrapper);
	}
}

editCategory();
