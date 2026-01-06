function moveElementProductTop() {
	let productTop = document.querySelector(".product-top");
	let pImageWrapper = document.querySelector(".p-image-wrapper");
	let pInfoWrapper = document.querySelector(".p-info-wrapper");

	if (!productTop || !pImageWrapper || !pInfoWrapper) {
		console.warn("Required elements for moving product top are missing.");
		return;
	}

	let reviewAndCodeWrapper = document.createElement("div");
	reviewAndCodeWrapper.classList.add("review-and-code-wrapper");
	let starsWrapperTop = document.querySelector(".stars-wrapper");
	if (starsWrapperTop) {
		addNumberOfReviewsToProductTop(starsWrapperTop);
		reviewAndCodeWrapper.appendChild(starsWrapperTop);
	}
	let productCode = document.querySelector(".p-detail-inner .p-code");
	if (productCode) {
		reviewAndCodeWrapper.appendChild(productCode);
	}

	let pDetailInnerHeader = document.querySelector(".p-detail-inner-header");
	if (pDetailInnerHeader) {
		pDetailInnerHeader.append(reviewAndCodeWrapper);
	}

	addSupportToImageWrapper(pImageWrapper);

	productTopDependingOnDevice(productTop, pImageWrapper, pInfoWrapper);
	document.addEventListener("debouncedResize", function () {
		productTopDependingOnDevice(productTop, pImageWrapper, pInfoWrapper);
	});

	addParametrersToProductTop(pInfoWrapper);
	avaiabilityAndDeliveryWrapper(productTop, pInfoWrapper);
	priceAndButtonWrapper(productTop, pInfoWrapper);
	readMoreDescription(productTop, pInfoWrapper);
	moveFlagsToImageWrapper(productTop, pImageWrapper);
	addListenerToThumbnails(pImageWrapper);
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

function productTopDependingOnDevice(productTop, pImageWrapper, pInfoWrapper) {
	if (isSmallTablet) {
		let breadCrumbsWrapper = document.querySelector(".breadcrumbs-wrapper");
		if (breadCrumbsWrapper) {
			let header = document.querySelector("#header");
			if (header) {
				//insert breadcrumbs after header
				header.after(breadCrumbsWrapper);
			}
		}
		let productH1 = document.querySelector(".p-info-wrapper h1");
		if (productH1) {
			let pDetailInnerHeader = document.querySelector(".p-detail-inner-header");
			if (pDetailInnerHeader) {
				pDetailInnerHeader.prepend(productH1);
			}
		}

		let reviewAndCodeWrapper = document.querySelector(".p-info-wrapper .review-and-code-wrapper");
		if (reviewAndCodeWrapper) {
			let pDetailInnerHeader = document.querySelector(".p-detail-inner-header");
			if (pDetailInnerHeader) {
				pDetailInnerHeader.appendChild(reviewAndCodeWrapper);
			}
		}
		let pCode = document.querySelector(".review-and-code-wrapper .p-code");
		if (pCode) {
			pInfoWrapper.appendChild(pCode);
		}

		let productImageSupportElement = pImageWrapper.querySelector(".product-image-support-element");
		if (productImageSupportElement) {
			pInfoWrapper.appendChild(productImageSupportElement);
		}
	}

	if (!isSmallTablet) {
		let breadCrumbsWrapper = document.querySelector(".overall-wrapper > .breadcrumbs-wrapper");
		if (breadCrumbsWrapper) {
			pInfoWrapper.prepend(breadCrumbsWrapper);
		}
		let productH1 = document.querySelector(".p-detail-inner h1");
		if (productH1) {
			pInfoWrapper.prepend(productH1);
		}

		let reviewAndCodeWrapper = document.querySelector(".review-and-code-wrapper");
		if (reviewAndCodeWrapper) {
			pInfoWrapper.appendChild(reviewAndCodeWrapper);
			let pCode = pInfoWrapper.querySelector(".p-code");
			if (pCode) {
				reviewAndCodeWrapper.appendChild(pCode);
			}
		}

		let productImageSupportElement = pInfoWrapper.querySelector(".product-image-support-element");
		if (productImageSupportElement) {
			pImageWrapper.appendChild(productImageSupportElement);
		}
	}
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
	let ratingTab = document.querySelector("#ratingTab");
	if (ratingTab) {
		//insert detail parameters after rating tab
		ratingTab.after(document.querySelector(".extended-description"));
	}

	const parametersToMove = detailParameters.querySelectorAll("tr");
	if (!parametersToMove || parametersToMove.length === 0) {
		return;
	}

	const detailParametersTop = document.createElement("div");
	detailParametersTop.classList.add("detail-parameters-top");

	parametersToMove.forEach((parameter, index) => {
		if (index <= 3) {
			let parameterValue = parameter.querySelector("td").textContent;

			if (parameterValue.toLowerCase().includes("doplněk")) {
				let productName = document.querySelector("h1");

				if (productName) {
					const procutNameAddition = document.createElement("span");
					procutNameAddition.classList.add("product-name-addition");
					procutNameAddition.innerHTML = "–&nbsp;" + parameterValue.trim();
					productName.appendChild(procutNameAddition);
					return;
				}
			}
		}
		if (index > 3) {
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
	const priceAndButtonWrapperWrapper = document.createElement("div");
	priceAndButtonWrapperWrapper.classList.add("price-and-button-wrapper-wrapper");

	const priceAndButtonWrapper = document.createElement("div");
	priceAndButtonWrapper.classList.add("price-and-button-wrapper");

	priceAndButtonWrapperWrapper.appendChild(priceAndButtonWrapper);
	pInfoWrapper.appendChild(priceAndButtonWrapperWrapper);

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

function addListenerToThumbnails(pImageWrapper) {
	let thumbnails = pImageWrapper.querySelectorAll(".p-thumbnail");
	if (!thumbnails || thumbnails.length === 0) {
		return;
	}
	let pMainImage = pImageWrapper.querySelector(".p-main-image");
	if (!pMainImage) {
		return;
	}
	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener("click", function (event) {
			if (index !== 0) {
				pMainImage.classList.add("no-first-image");
			} else {
				pMainImage.classList.remove("no-first-image");
			}
		});
	});
}

function addSupportToImageWrapper(pImageWrapper) {
	const supportElement = document.createElement("div");
	supportElement.classList.add("product-image-support-element");

	const supportText = document.createElement("span");
	supportText.classList.add("support-text");
	supportText.innerHTML = translationsStrings.natiosSupportTextTop[activeLang];

	const supportLink = document.createElement("a");
	supportLink.classList.add("support-link");
	supportLink.href = translationsStrings.natiosSupportPageUrl[activeLang];
	supportLink.textContent = translationsStrings.more[activeLang];

	supportElement.appendChild(supportText);
	supportElement.appendChild(supportLink);

	pImageWrapper.appendChild(supportElement);
}
