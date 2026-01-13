function addAmountToCartInProductsBlock() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("amount-to-cart-added")) {
			return; // Skip if already processed
		}
		product.classList.add("amount-to-cart-added");
		let productCodeForFilter = product.querySelector("span[data-micro='sku']")?.textContent.trim();
		if (!productCodeForFilter) {
			console.warn("Product code not found for a product.");
			return;
		}

		let pToolForm = product.querySelector(".p-tools form");
		if (!pToolForm) {
			console.warn("Add to cart form not found for product code:", productCodeForFilter);
			return;
		}
		const amountInput = document.createElement("span");
		amountInput.classList.add("quantity");
		amountInput.innerHTML = `
	
    <span class="increase-tooltip js-increase-tooltip" data-trigger="manual" data-container="body" data-original-title="Není možné zakoupit více než 999 ks." aria-hidden="true" role="tooltip" data-testid="tooltip">
    </span>

    <span class="decrease-tooltip js-decrease-tooltip" data-trigger="manual" data-container="body" data-original-title="Minimální množství, které lze zakoupit, je 1 ks." aria-hidden="true" role="tooltip" data-testid="tooltip">
    </span>
    <label>
        <input type="number" name="amount" value="1" class="amount" autocomplete="off" data-decimals="0" step="1" min="1" max="999" aria-label="Množství" data-testid="cartAmount" data-np-intersection-state="visible">
    </label>

    <button class="increase" type="button" aria-label="Zvýšit množství o 1" data-testid="increase">
            <span class="increase__sign">+</span>
    </button>

    <button class="decrease" type="button" aria-label="Snížit množství o 1" data-testid="decrease">
            <span class="decrease__sign">−</span>
    </button>

		`;
		pToolForm.appendChild(amountInput);
	});
}

addAmountToCartInProductsBlock();

document.addEventListener("ShoptetDOMContentLoaded", function () {
	addAmountToCartInProductsBlock();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", function () {
	addAmountToCartInProductsBlock();
});

document.addEventListener("luigiSearchDone", function () {
	addAmountToCartInProductsBlock();
});

if (body.classList.contains("in-oblibene")) {
	document.addEventListener("dkLabFavouriteProductsLoaded", function () {
		addAmountToCartInProductsBlock();
	});
}
