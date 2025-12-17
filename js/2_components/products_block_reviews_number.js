/*---------ACTION PRICE AND REVIEWS NUMBER*/
function productsBlockReviewsNumber() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("reviews-added")) {
			return; // Skip if already processed
		}
		product.classList.add("reviews-added");

		let starWrapper = product.querySelector(".stars-wrapper");
		if (starWrapper) {
			let reviewsNumber = starWrapper.getAttribute("data-micro-rating-count");
			if (reviewsNumber) {
				const reviewsNumberSpan = document.createElement("span");
				reviewsNumberSpan.className = "reviews-number";
				reviewsNumberSpan.innerHTML = reviewsNumber + "x";
				starWrapper.appendChild(reviewsNumberSpan);
			}
		}
	});
}

productsBlockReviewsNumber();

document.addEventListener("ShoptetDOMContentLoaded", function () {
	productsBlockReviewsNumber();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", function () {
	productsBlockReviewsNumber();
});

if (body.classList.contains("in-oblibene")) {
	document.addEventListener("dkLabFavouriteProductsLoaded", function () {
		productsBlockReviewsNumber();
	});
}
