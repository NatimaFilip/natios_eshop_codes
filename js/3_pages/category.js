function editCategory() {
	if (!body.classList.contains("type-category")) {
		return;
	}

	let categotyTop = document.querySelector(".category-top");
	/* 	let contentWrapperIn = document.querySelector(".content-wrapper-in");
	if (contentWrapperIn && categotyTop) {
		contentWrapperIn.prepend(categotyTop);
	}  */

	let breadcrumbsWrapper = document.querySelector(".breadcrumbs-wrapper");
	if (categotyTop && breadcrumbsWrapper) {
		categotyTop.prepend(breadcrumbsWrapper);
	}
}

editCategory();
