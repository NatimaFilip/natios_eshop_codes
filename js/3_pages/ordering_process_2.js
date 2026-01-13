if (body.classList.contains("id--16")) {
	let deliveryMethodWrapper = document.querySelector(".co-delivery-method");
	let paymentMethodWrapper = document.querySelector(".co-payment-method");
	editTextOfBillingH4();

	document.addEventListener("DOMContentLoaded", function () {
		disableInputs(deliveryMethodWrapper);
		disableInputs(paymentMethodWrapper);
		removeDeliveryFromRecap();
		removePaymentFromRecap();
	});

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

function editTextOfBillingH4() {
	let boxBilling = document.querySelector(".co-billing-address");
	if (boxBilling) {
		let billingAddressH4 = boxBilling.querySelector("h4");
		if (billingAddressH4) {
			billingAddressH4.textContent = translationsStrings.dorucovaciAFakturacniAdresa[activeLang];
		}
	}
}

/*
document.addEventListener("DOMContentLoaded", function () {
		if (deliveryMethodWrapper) {
			disableInputs(deliveryMethodWrapper);
			removeDeliveryFromRecap();
		}
		if (paymentMethodWrapper) {
			paymentMethodWrapper.classList.add("disabled");
			disableInputs(paymentMethodWrapper);
			removePaymentFromRecap();
		}
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
		document.addEventListener("ShoptetBillingMethodUpdated", function () {
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
	});

	function disableInputs(method) {
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
		let recapText = document.querySelector(
			".recapitulation-shipping-billing.last .recapitulation-shipping-billing-info"
		);
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
*/
