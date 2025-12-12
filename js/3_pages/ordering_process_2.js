if (body.classList.contains("id--16")) {
	let deliveryMethodWrapper = document.querySelector(".co-delivery-method");
	let paymentMethodWrapper = document.querySelector(".co-payment-method");

	document.addEventListener("DOMContentLoaded", function () {
		disableInputs(deliveryMethodWrapper);
		disableInputs(paymentMethodWrapper);
		removeDeliveryFromRecap();
		removePaymentFromRecap();

		createWrapperForSummary();
		fetchImagesOfProductsInCart();
	});
	createWrapperForSummary();

	document.addEventListener("ShoptetShippingMethodUpdated", function () {
		let activeDeliveryMethod = document.querySelector("#order-shipping-methods > .radio-wrapper.active");
		let activePaymentMethod = document.querySelector("#order-billing-methods > .radio-wrapper.active");

		if (!activePaymentMethod) {
			setTimeout(() => {
				removePaymentFromRecap();
				disableInputs(paymentMethodWrapper);
			}, 200);
		}

		if (activeDeliveryMethod) {
			paymentMethodWrapper.classList.remove("disabled");
			deliveryMethodWrapper.classList.add("selected");
		} else {
			deliveryMethodWrapper.classList.remove("selected");
		}
	});
}

function disableInputs(method) {
	if (!method) return;
	let allInputs = method.querySelectorAll("input");

	if (!allInputs) return;
	allInputs.forEach((input) => {
		input.checked = false;
		input.parentElement.classList.remove("active");
	});
}

function removeDeliveryFromRecap() {
	let recapText = document.querySelector(".recapitulation-shipping-billing .recapitulation-shipping-billing-info");
	if (recapText) {
		if (csLang) {
			recapText.textContent = "Zvolte způsob dopravy";
		}
		if (skLang) {
			recapText.textContent = "Zvoľte spôsob dopravy";
		}
		if (plLang) {
			recapText.textContent = "Wybierz sposób dostawy";
		}
	}
}
function removePaymentFromRecap() {
	let recapText = document.querySelector(".recapitulation-shipping-billing.last .recapitulation-shipping-billing-info");
	if (recapText) {
		if (csLang) {
			recapText.textContent = "Zvolte způsob platby";
		}
		if (skLang) {
			recapText.textContent = "Zvoľte spôsob platby";
		}
		if (plLang) {
			recapText.textContent = "Wybierz sposób płatności";
		}
	}
}

async function fetchImagesOfProductsInCart() {
	let itemNames = document.querySelectorAll(".cart-item .cart-item-name");
	if (!itemNames) return;

	itemNames.forEach(async (itemName) => {
		let productLink = itemName.querySelector("a");
		if (!productLink) return;

		const imageBlock = document.createElement("div");
		imageBlock.classList.add("image-block");
		itemName.parentElement.prepend(imageBlock);

		let productUrl = productLink.href;

		try {
			let response = await fetch(productUrl);
			/* let response = await fetch(window.location.origin + productUrl); */

			if (!response.ok) throw new Error("Network response was not ok");

			let html = await response.text();

			// Parse the HTML string into a document
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, "text/html");

			// Get the image element
			let img = doc.querySelector(".p-main-image > img");

			if (img) {
				// Clone the image so it can be used in the current DOM
				let newImg = document.createElement("img");
				newImg.src = img.src.replace("/big/", "/detail/");
				newImg.alt = img.alt || "";

				// Prepend to itemName
				itemName.querySelector(".image-block").append(newImg);
			}
		} catch (error) {
			console.error("There has been a problem with your fetch operation:", error);
		}
	});
}
function createWrapperForSummary() {
	let cartSummary = document.querySelector("#checkoutSidebar .cart-content");
	if (!cartSummary) return;

	let cartSummaryPrevious = document.querySelector(".cart-summary-wrapper");

	let summaryWrapper = document.createElement("div");
	summaryWrapper.classList.add("cart-summary-wrapper");
	if (!cartSummaryPrevious) {
		cartSummary.appendChild(summaryWrapper);
	}
	if (cartSummaryPrevious) {
		summaryWrapper = cartSummaryPrevious;
	}

	let shippingBillingSummary = document.querySelector("#shipping-billing-summary");
	if (shippingBillingSummary) {
		summaryWrapper.appendChild(shippingBillingSummary);
	}

	let orderSummaryHelper = document.querySelector(".order-summary-item.helper");
	if (orderSummaryHelper) {
		summaryWrapper.appendChild(orderSummaryHelper);
	}

	let orderPriceSummary = document.querySelector(".order-summary-item.price");
	if (orderPriceSummary) {
		summaryWrapper.appendChild(orderPriceSummary);
	}

	let nextStep = document.querySelector(".next-step");
	if (nextStep) {
		summaryWrapper.appendChild(nextStep);
	}
}
