if (body.classList.contains("id--16")) {
	let deliveryMethodWrapper = document.querySelector(".co-delivery-method");
	let paymentMethodWrapper = document.querySelector(".co-payment-method");

	document.addEventListener("DOMContentLoaded", function () {
		disableInputs(deliveryMethodWrapper);
		disableInputs(paymentMethodWrapper);
		removeDeliveryFromRecap();
		removePaymentFromRecap();
		createWrapperForSummary();
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
