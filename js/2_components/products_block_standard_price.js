/*---------ACTION PRICE AND REVIEWS NUMBER*/
function productsBlockStandardPrice() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("standard-price-moved")) {
			return; // Skip if already processed
		}
		product.classList.add("standard-price-moved");

		let standardPrice = product.querySelector(".flag-discount .price-standard");
		let finalPrice = product.querySelector(".price-final");
		if (standardPrice && finalPrice) {
			finalPrice.appendChild(standardPrice);
		}
	});
}

productsBlockStandardPrice();

document.addEventListener("ShoptetDOMContentLoaded", function () {
	productsBlockStandardPrice();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", function () {
	productsBlockStandardPrice();
});
