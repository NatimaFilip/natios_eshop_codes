function moveRelatedProducts() {
	let relatedProducts = document.querySelector(".products-related");

	let productsRelatedHeader = document.querySelector(".products-related-header");
	let tabContent = document.querySelector("#tab-content");
	if (relatedProducts && productsRelatedHeader && tabContent) {
		if (relatedProducts.parentElement.classList.contains("products-slider")) {
			relatedProducts = relatedProducts.parentElement;
		}

		tabContent.appendChild(productsRelatedHeader);
		tabContent.appendChild(relatedProducts);
	}
}

if (body.classList.contains("type-product")) {
	moveRelatedProducts();
}
