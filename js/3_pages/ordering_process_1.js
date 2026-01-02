if (body.classList.contains("id--9")) {
	moveAvaiabilityAmount();
	avaiabilityAndDeliveryWrapperCart();
	moveGiftsCart();
	moveCartSummaryToSidebar();
	addCheckboxToCouponField();
	giftSelectCustom();
	giftEdit();

	document.addEventListener("ShoptetDOMCartContentLoaded", () => {
		moveAvaiabilityAmount();
		avaiabilityAndDeliveryWrapperCart();
		moveGiftsCart();
		moveCartSummaryToSidebar();
		addCheckboxToCouponField();
		giftSelectCustom();
		giftEdit();
	});
}

function moveAvaiabilityAmount() {
	let pAvailabilities = document.querySelectorAll(".cart-table .p-availability");
	if (!pAvailabilities || !pAvailabilities.length) return;

	pAvailabilities.forEach((pAvailability) => {
		let amount = pAvailability.querySelector(".availability-amount");
		if (!amount) return;

		let label = pAvailability.querySelector(".availability-label");
		if (!label) return;

		label.appendChild(amount);
	});
}

function avaiabilityAndDeliveryWrapperCart() {
	let pAvailabilities = document.querySelectorAll(".cart-table .p-availability");
	if (!pAvailabilities || !pAvailabilities.length) return;

	let deliveryTime = document.querySelector(".delivery-time .show-tooltip");

	if (deliveryTime) {
		editDeliveryDateTextCart(deliveryTime);

		pAvailabilities.forEach((pAvailability) => {
			const availabilityAndDeliveryWrapper = document.createElement("div");
			availabilityAndDeliveryWrapper.classList.add("availability-and-delivery-wrapper");

			const deliveryTimeCloned = deliveryTime.cloneNode(true);

			availabilityAndDeliveryWrapper.appendChild(deliveryTimeCloned);
			pAvailability.appendChild(availabilityAndDeliveryWrapper);
		});
	}
}
function editDeliveryDateTextCart(deliveryTime) {
	const deliveryText1 = document.createElement("span");
	deliveryText1.classList.add("delivery-text-1");
	deliveryText1.textContent = translationsStrings.deliveryTime_1[activeLang] + " ";

	const deliveryText2 = document.createElement("span");
	deliveryText2.classList.add("delivery-text-2");
	deliveryText2.textContent = " " + translationsStrings.deliveryTime_2[activeLang];

	deliveryTime.prepend(deliveryText1);
	deliveryTime.appendChild(deliveryText2);
}

function moveGiftsCart() {
	let gifts = document.querySelector(".free-gift");
	let cartWrapper = document.querySelector("#cart-wrapper");
	if (gifts && cartWrapper) {
		cartWrapper.append(gifts);
	}
	let extraGift = document.querySelector(".extra.gift");
	if (extraGift && cartWrapper && !gifts) {
		const extraGiftWrapper = document.createElement("div");
		extraGiftWrapper.classList.add("free-gifts-wrapper");

		const extraGiftContainer = document.createElement("div");
		extraGiftContainer.classList.add("free-gift");
		extraGiftWrapper.appendChild(extraGift);

		extraGiftContainer.appendChild(extraGiftWrapper);
		cartWrapper.append(extraGiftContainer);
	}

	let freeGiftsWrapper = document.querySelector(".free-gifts-wrapper");
	if (freeGiftsWrapper) {
		let giftsHeader = document.createElement("h2");
		giftsHeader.classList.add("free-gifts-header");
		giftsHeader.textContent = translationsStrings.freeGiftsHeader[activeLang];
		freeGiftsWrapper.prepend(giftsHeader);
	}
}

function giftSelectCustom() {
	document.querySelectorAll(".free-gifts-wrapper .free-gifts label").forEach((label) => {
		label.addEventListener("click", function (event) {
			event.preventDefault();
			const forId = label.getAttribute("for");
			document.querySelectorAll(".free-gifts input").forEach((input) => {
				input.checked = input.id === forId;
			});
			const form = document.querySelector(".free-gifts-wrapper form");
			if (form && window.shoptet && shoptet.cart && typeof shoptet.cart.ajaxSubmitForm === "function") {
				shoptet.cart.ajaxSubmitForm(form.getAttribute("action"), form, "functionsForCart", "cart", true);
			}
		});
	});
}

function moveCartSummaryToSidebar() {
	let cartSummary = document.querySelector(".cart-summary");
	let sidebar = document.querySelector(".sidebar-in-cart");
	if (cartSummary && sidebar) {
		sidebar.append(cartSummary);
	}
}

function addCheckboxToCouponField() {
	let couponField = document.querySelector(".discount-coupon");
	if (!couponField) return;

	couponField.classList.add("disabled");

	const checkboxWrapper = document.createElement("div");
	checkboxWrapper.classList.add("coupon-checkbox-wrapper");
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "coupon-checkbox";
	checkbox.classList.add("coupon-checkbox-input");
	const label = document.createElement("label");
	label.htmlFor = "coupon-checkbox";
	label.classList.add("coupon-checkbox-label");
	label.textContent = translationsStrings.iHaveSaleCoupon[activeLang];

	checkboxWrapper.appendChild(checkbox);
	checkboxWrapper.appendChild(label);
	couponField.prepend(checkboxWrapper);

	checkbox.addEventListener("change", function () {
		if (this.checked) {
			couponField.classList.remove("disabled");
		} else {
			couponField.classList.add("disabled");
		}
	});
}

function giftEdit() {
	let freeGift = document.querySelector(".free-gift");
	if (!freeGift) return;

	let extraGift = document.querySelector(".extra.gift");
	if (!extraGift) {
		return;
	}
	freeGift.prepend(extraGift);

	let giftSpan = document.querySelector(".extra.gift > span");

	if (!giftSpan) {
		return;
	}

	let darkyTextObjednejte = "";
	let darkyTextHodnotnejsi = "";

	let darkyPrice = document.querySelector(".extra.gift > span > strong").textContent;

	darkyTextObjednejte = "Objednejte ještě za ";
	darkyTextHodnotnejsi = " a vyberte si z hodnotnějších dárků.";

	giftSpan.innerHTML = darkyTextObjednejte + "<strong>" + darkyPrice + "</strong>" + darkyTextHodnotnejsi;
}
