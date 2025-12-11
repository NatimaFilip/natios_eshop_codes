function moveElementProductTop() {
	let productTop = document.querySelector(".product-top");
	let pImageWrapper = document.querySelector(".p-image-wrapper");
	let pInfoWrapper = document.querySelector(".p-info-wrapper");

	if (!productTop || !pImageWrapper || !pInfoWrapper) {
		console.warn("Required elements for moving product top are missing.");
		return;
	}
	let breadCrumbsWrapper = document.querySelector(".breadcrumbs-wrapper");
	if (breadCrumbsWrapper) {
		pInfoWrapper.prepend(breadCrumbsWrapper);
	}

	let productH1 = document.querySelector("h1");
	if (productH1) {
		pInfoWrapper.prepend(productH1);
	}

	const reviewAndCodeWrapper = document.createElement("div");
	reviewAndCodeWrapper.classList.add("review-and-code-wrapper");

	let starsWrapperTop = productTop.querySelector(".stars-wrapper");
	if (starsWrapperTop) {
		addNumberOfReviewsToProductTop(starsWrapperTop);
		reviewAndCodeWrapper.appendChild(starsWrapperTop);
	}

	let productCode = document.querySelector(".p-detail-inner .p-code");
	if (productCode) {
		reviewAndCodeWrapper.appendChild(productCode);
	}

	if (starsWrapperTop || productCode) {
		pInfoWrapper.appendChild(reviewAndCodeWrapper);
	}

	addParametrersToProductTop(pInfoWrapper);
	avaiabilityAndDeliveryWrapper(productTop, pInfoWrapper);
	priceAndButtonWrapper(productTop, pInfoWrapper);
	readMoreDescription(productTop, pInfoWrapper);
	moveFlagsToImageWrapper(productTop, pImageWrapper);
}

if (body.classList.contains("type-product")) {
	moveElementProductTop();

	document.addEventListener("DOMContentLoaded", function () {
		let thumbnailsWrapper = document.querySelector(".p-thumbnails-inner");
		let thumbnailsParent = document.querySelector(".p-thumbnails-inner > div");
		let thumbnails = document.querySelectorAll(".p-thumbnail");
		if (thumbnails && thumbnailsParent && thumbnailsWrapper) {
			inicializeSliderElement(thumbnailsWrapper, thumbnailsParent, thumbnails, "thumbnails-slider", null);
		}
	});
}

function addNumberOfReviewsToProductTop(starsWrapperTop) {
	let starElement = starsWrapperTop.querySelector(".star");
	if (!starElement) {
		return;
	}
	let starsScore = starElement.getAttribute("title") || starElement.getAttribute("data-original-title");

	if (starsScore) {
		starsScore = starsScore.split(":")[1].split("/")[0].trim();
		starsScore = parseFloat(starsScore).toFixed(2).replace(".", ",");
		if (starsScore != null && starsScore != "NaN") {
			const starsScoreElement = document.createElement("div");
			starsScoreElement.className = "stars-score";
			starsScoreElement.innerHTML = `<span class="stars-score-text">${starsScore}</span> / 5`;
			starsWrapperTop.appendChild(starsScoreElement);
		} else {
			starsWrapperTop.classList.add("no-score");
			if (ratingTab) {
				ratingTab.classList.add("no-score");
			}
			let starsLabel = starsWrapperTop.querySelector(".stars-label");
			if (starsLabel) {
				starsLabel.textContent = translationsStrings.insertFirstReview[activeLang];
			}
		}
	}
}

function addParametrersToProductTop(pInfoWrapper) {
	let detailParameters = document.querySelector(".extended-description .detail-parameters");
	if (!detailParameters) {
		return;
	}

	const parametersToMove = detailParameters.querySelectorAll("tr");
	if (!parametersToMove || parametersToMove.length === 0) {
		return;
	}

	const detailParametersTop = document.createElement("div");
	detailParametersTop.classList.add("detail-parameters-top");

	parametersToMove.forEach((parameter, index) => {
		console.log("Processing parameter:", parameter, "at index:", index);
		if (index > 4) {
			const parameterWrapper = document.createElement("div");
			parameterWrapper.classList.add("parameter-wrapper");

			const parameterName = document.createElement("div");
			parameterName.classList.add("parameter-name");
			parameterName.textContent = parameter.querySelector("th").textContent.replace(":", "");

			const parameterValue = document.createElement("div");
			parameterValue.classList.add("parameter-value");
			parameterValue.textContent = parameter.querySelector("td").textContent;

			parameterWrapper.appendChild(parameterName);
			parameterWrapper.appendChild(parameterValue);
			detailParametersTop.appendChild(parameterWrapper);
		}
	});
	pInfoWrapper.appendChild(detailParametersTop);
}

function avaiabilityAndDeliveryWrapper(productTop, pInfoWrapper) {
	const availabilityAndDeliveryWrapper = document.createElement("div");
	availabilityAndDeliveryWrapper.classList.add("availability-and-delivery-wrapper");

	let availabilityValue = document.querySelector(".availability-value");
	if (availabilityValue) {
		editAvaiabilityText(availabilityValue);
		availabilityAndDeliveryWrapper.appendChild(availabilityValue);
	}

	let deliveryTime = productTop.querySelector(".delivery-time");
	if (deliveryTime) {
		editDeliveryDateText(deliveryTime);
		availabilityAndDeliveryWrapper.appendChild(deliveryTime);
	}
	pInfoWrapper.appendChild(availabilityAndDeliveryWrapper);
}

function editAvaiabilityText(availabilityValue) {
	let availabilityAmount = availabilityValue.querySelector(".availability-amount");
	if (!availabilityAmount) {
		return;
	}
	availabilityAmount.textContent = availabilityAmount.textContent.replace("(", "").replace(")", "").trim();
	availabilityAmount.textContent = availabilityAmount.textContent
		.replace(">", translationsStrings.moreThan[activeLang])
		.trim();
}

function editDeliveryDateText(deliveryTime) {
	const deliveryText1 = document.createElement("span");
	deliveryText1.classList.add("delivery-text-1");
	deliveryText1.textContent = translationsStrings.deliveryTime_1[activeLang] + " ";

	const deliveryText2 = document.createElement("span");
	deliveryText2.classList.add("delivery-text-2");
	deliveryText2.textContent = " " + translationsStrings.deliveryTime_2[activeLang];

	deliveryTime.prepend(deliveryText1);
	deliveryTime.appendChild(deliveryText2);
}

function priceAndButtonWrapper(productTop, pInfoWrapper) {
	const priceAndButtonWrapper = document.createElement("div");
	priceAndButtonWrapper.classList.add("price-and-button-wrapper");
	pInfoWrapper.appendChild(priceAndButtonWrapper);

	let priceStandard = pInfoWrapper.querySelector(".price-standard");
	if (priceStandard) {
		priceAndButtonWrapper.appendChild(priceStandard);
	} else {
		priceAndButtonWrapper.classList.add("no-standard-price");
	}

	let priceFinal = pInfoWrapper.querySelector(".price-final");
	if (priceFinal) {
		const withVatInfo = document.createElement("span");
		withVatInfo.classList.add("with-vat-info");
		withVatInfo.textContent = translationsStrings.withVAT[activeLang];
		priceFinal.appendChild(withVatInfo);
		priceAndButtonWrapper.appendChild(priceFinal);
	}

	let quantity = pInfoWrapper.querySelector(".quantity");
	if (quantity) {
		priceAndButtonWrapper.appendChild(quantity);
	}

	let addToCartButton = pInfoWrapper.querySelector(".add-to-cart-button");
	if (addToCartButton) {
		priceAndButtonWrapper.appendChild(addToCartButton);
	}

	//dispatch event after moving price and button
	const event = new Event("priceAndButtonMoved");
	document.dispatchEvent(event);
	console.log(
		"%c priceAndButtonMoved event dispatched ",
		"background: lime; color: black; padding: 5px 10px; font-weight: bold;"
	);
}

function readMoreDescription(productTop, pInfoWrapper) {
	let readMoreDescriptionBtn = productTop.querySelector("p[data-testid='productCardDescr']");
	let socialButtonsWrapper = productTop.querySelector(".social-buttons-wrapper");

	if (readMoreDescriptionBtn && socialButtonsWrapper) {
		let readMoreDescriptionBtnA = readMoreDescriptionBtn.querySelector("a");
		if (readMoreDescriptionBtnA) {
			readMoreDescriptionBtnA.textContent = translationsStrings.readMore[activeLang];
		}
		socialButtonsWrapper.appendChild(readMoreDescriptionBtn);
	}
}

function moveFlagsToImageWrapper(productTop, pImageWrapper) {
	let flagsDefault = productTop.querySelector(".flags-default");
	let pImage = pImageWrapper.querySelector(".p-image");
	if (flagsDefault && pImage) {
		pImage.appendChild(flagsDefault);
	}
}
