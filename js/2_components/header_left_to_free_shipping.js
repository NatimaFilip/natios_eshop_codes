// Check if dataLayer exists and has cart info
if (shoptetDataLayer) {
	console.log(shoptetDataLayer);
	let freeShipping = shoptetDataLayer.cartInfo.freeShipping;

	if (freeShipping != null && freeShipping === true) {
		console.log("FREE SHIPPING ACTIVE");
	}

	if (freeShipping != null && freeShipping === false) {
		let leftToFreeShippingFormattedPrice = shoptetDataLayer.cartInfo.leftToFreeShipping.formattedPrice;
		console.log(leftToFreeShippingFormattedPrice);

		let navigationButtons = document.querySelector("#header .navigation-buttons");
		if (navigationButtons) {
			let freeShippingElement = document.createElement("div");
			freeShippingElement.classList.add("header-free-shipping-info");

			const freeShippingTextOne = document.createElement("span");
			freeShippingTextOne.classList.add("free-shipping-text-one");
			freeShippingTextOne.innerText = translationsStrings.buyMoreForFreeDelivery_1[activeLang] + " ";

			const freeShippingAmount = document.createElement("b");
			freeShippingAmount.classList.add("free-shipping-amount");
			freeShippingAmount.innerText = leftToFreeShippingFormattedPrice;

			const freeShippingTextTwo = document.createElement("span");
			freeShippingTextTwo.classList.add("free-shipping-text-two");
			freeShippingTextTwo.innerText = translationsStrings.buyMoreForFreeDelivery_2[activeLang];

			freeShippingTextOne.appendChild(freeShippingAmount);
			freeShippingElement.appendChild(freeShippingTextOne);
			freeShippingElement.appendChild(freeShippingTextTwo);

			navigationButtons.prepend(freeShippingElement);
		}
	}
}
