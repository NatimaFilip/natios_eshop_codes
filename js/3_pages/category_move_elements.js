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
}

editCategory();

document.addEventListener("ShoptetDOMContentLoaded", () => {
	let categoryTopInContent = document.querySelector("#content .category-top");
	if (categoryTopInContent) {
		categoryTopInContent.remove();
	}
});
