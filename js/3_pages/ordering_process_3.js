if (body.classList.contains("id--17")) {
	createGridSystemInOrderThree();
	editTextOfBillingH4();
}

function createGridSystemInOrderThree() {
	let coContactInformation = document.querySelector(".co-contact-information");
	let coBillingAddress = document.querySelector(".co-billing-address");

	let cartHeader = document.querySelector(".cart-header");

	if (!coContactInformation || !coBillingAddress || !cartHeader) return;

	let movingObjects = [coContactInformation, coBillingAddress];

	const customGridSystemOrderThree = document.createElement("div");
	customGridSystemOrderThree.classList.add("custom-grid-system-order-three");

	movingObjects.forEach((element) => {
		const customGridElement = document.createElement("div");
		customGridElement.classList.add("custom-grid-element-order-three");

		let gridHeader = element.querySelector("h4");
		if (gridHeader) {
			customGridElement.appendChild(gridHeader);
		}

		customGridElement.appendChild(element);
		customGridSystemOrderThree.appendChild(customGridElement);
	});
	cartHeader.insertAdjacentElement("afterend", customGridSystemOrderThree);

	let addNote = document.querySelector("#add-note");
	if (addNote) {
		coContactInformation.appendChild(addNote.parentElement.parentElement);
	}

	let companyShopping = document.querySelector("#company-shopping");
	if (companyShopping) {
		coBillingAddress.appendChild(companyShopping.parentElement);
	}

	let companyInfo = document.querySelector("#company-info");
	if (companyInfo) {
		coBillingAddress.appendChild(companyInfo);
	}

	let anotherShipping = document.querySelector("#another-shipping");
	if (anotherShipping) {
		coBillingAddress.appendChild(anotherShipping.parentElement);
	}
	let shippingAdress = document.querySelector("#shipping-address");
	if (shippingAdress) {
		coBillingAddress.appendChild(shippingAdress);
	}
}

function editTextOfBillingH4() {
	let boxBilling = document.querySelector(".co-billing-address");
	if (boxBilling) {
		//closest h4 to boxBilling
		let billingAddressH4 = boxBilling.closest("h4");

		if (billingAddressH4) {
			billingAddressH4.textContent = translationsStrings.dorucovaciAFakturacniAdresa[activeLang];
		}
	}
}
