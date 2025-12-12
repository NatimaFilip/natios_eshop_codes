let freeShippingElementCopy;

function createFreeShippingInfo() {
	if (!shoptetDataLayer?.cartInfo) return;

	const { freeShipping, leftToFreeShipping } = shoptetDataLayer.cartInfo;
	if (freeShipping == null) return;

	const navigationButtons = document.querySelector("#header .navigation-buttons");
	if (!navigationButtons) return;

	let freeShiippingElementPrevious = document.querySelector(".header-free-shipping-info");
	if (freeShiippingElementPrevious) {
		freeShiippingElementPrevious.remove();
	}

	const freeShippingElement = document.createElement("div");
	freeShippingElement.classList.add("header-free-shipping-info");

	const leftToFreeShippingPrice = leftToFreeShipping?.priceLeft;
	if (!leftToFreeShippingPrice) return;

	const leftToFreeShippingPriceFormatted = leftToFreeShipping?.formattedPrice;
	if (!leftToFreeShippingPriceFormatted) return;

	if (freeShipping || leftToFreeShippingPrice <= 0) {
		// Free shipping reached
		const textOne = document.createElement("span");
		textOne.classList.add("free-shipping-text-one");
		textOne.innerText = translationsStrings.reachedFreeDelivery_1[activeLang] + " ";

		const textTwo = document.createElement("span");
		textTwo.classList.add("free-shipping-text-two");
		textTwo.innerText = translationsStrings.reachedFreeDelivery_2[activeLang];

		freeShippingElement.appendChild(textOne);
		freeShippingElement.appendChild(textTwo);

		body.classList.add("free-shipping-reached");
	} else {
		// Show amount left for free shipping

		const textOne = document.createElement("span");
		textOne.classList.add("free-shipping-text-one");
		textOne.innerText = translationsStrings.buyMoreForFreeDelivery_1[activeLang] + " ";

		const amount = document.createElement("b");
		amount.classList.add("free-shipping-amount");
		amount.innerText = leftToFreeShippingPriceFormatted;

		const textTwo = document.createElement("span");
		textTwo.classList.add("free-shipping-text-two");
		textTwo.innerText = translationsStrings.buyMoreForFreeDelivery_2[activeLang];

		textOne.appendChild(amount);
		freeShippingElement.appendChild(textOne);
		freeShippingElement.appendChild(textTwo);
	}

	freeShippingElementCopy = freeShippingElement;

	navigationButtons.prepend(freeShippingElement);
}

function freeShippingInfoInCartWidghet() {
	if (!freeShippingElementCopy) return;

	let cartWitgetFreeShipping = document.querySelector("#cart-widget .cart-free-shipping");
	if (!cartWitgetFreeShipping) {
		return;
	}

	cartWitgetFreeShipping.innerHTML = freeShippingElementCopy.outerHTML;
}

createFreeShippingInfo();
document.addEventListener("ShoptetCartUpdated", function () {
	createFreeShippingInfo();
});

document.addEventListener("ShoptetDOMCartContentLoaded", function () {
	freeShippingInfoInCartWidghet();
});
