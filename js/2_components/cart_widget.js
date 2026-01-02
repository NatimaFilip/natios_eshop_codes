/* function positionOfCartOnNavigation() {
	let cartWidget = document.querySelector("#cart-widget");
	let cartNavigationButton = document.querySelector("#header .cart-count");

	if (!cartWidget || !cartNavigationButton) {
		console.warn("Cart widget or cart navigation button not found.");
		return;
	}
	cartNavigationButton.addEventListener("mouseenter", function () {
		applyTopOfCartWidget();
	});
	cartNavigationButton.addEventListener("click", function () {
		applyTopOfCartWidget();
	});

	let navigation = document.querySelector("#header #navigation");

	function applyTopOfCartWidget() {
		let topPosition = cartNavigationButton.getBoundingClientRect().bottom;
		let rightPosition = window.innerWidth - cartNavigationButton.getBoundingClientRect().right - scrollbarWidth;
		cartWidget.style.top = topPosition + "px";
		cartWidget.style.right = rightPosition + "px";

		let bottomSpaceOfCartNavButton =
			navigation.getBoundingClientRect().bottom - cartNavigationButton.getBoundingClientRect().bottom;
		console.log(bottomSpaceOfCartNavButton);
		cartWidget.style.setProperty("--pad-top", bottomSpaceOfCartNavButton + "px");
	}
}

document.addEventListener("DOMContentLoaded", function () {
	positionOfCartOnNavigation();
}); */

document.addEventListener("DOMContentLoaded", function () {
	let cartWidget = document.querySelector("#cart-widget");
	let cartNavigationButton = document.querySelector("#header .cart-count");
	let navigation = document.querySelector("#header #navigation");
	positionOfFixedComponent(cartWidget, cartNavigationButton, cartNavigationButton, navigation, true);
});

/*------------------------------------------------- KOSIK WIDGET - cena celkem do widgetu*/

let firstLoadOfCartWidget = true;
let cartWidgetSaveContinueButtonCopy;
let priceAddedToCartWidget = false;

document.addEventListener("ShoptetDOMCartContentLoaded", function () {
	saveContinueButton();
	insertTotalPriceToCartWidget();
});

function saveContinueButton() {
	console.log("saveContinueButton called");
	if (firstLoadOfCartWidget) {
		console.log("First load of cart widget, saving continue button.");
		let cartWidgetContinueButton = document.querySelector("#cart-widget .cart-widget-button");
		if (cartWidgetContinueButton) {
			cartWidgetSaveContinueButtonCopy = cartWidgetContinueButton.cloneNode(true);
			firstLoadOfCartWidget = false;
			return;
		}
	}

	if (!cartWidgetSaveContinueButtonCopy) return;
	if (!firstLoadOfCartWidget) {
		console.log("Re-adding continue button to cart widget.");
		console.log(cartWidgetSaveContinueButtonCopy);
		let cartWidget = document.querySelector("#cart-widget");
		cartWidget.appendChild(cartWidgetSaveContinueButtonCopy);
	}
}

function insertTotalPriceToCartWidget() {
	let header = document.querySelector("#header");
	if (!header) {
		return;
	}
	let totalPriceElement = header.querySelector(".cart-price");
	if (!totalPriceElement) {
		return;
	}
	let totalPrice = totalPriceElement.textContent.trim();
	if (!totalPrice) {
		return;
	}

	let cartWidgetButton = document.querySelector("#cart-widget .cart-widget-button");
	if (!cartWidgetButton) {
		return;
	}

	let popupWidgetInner = document.querySelector("#cart-widget .cart-widget-inner");
	if (popupWidgetInner) {
		popupWidgetInner.appendChild(cartWidgetButton);
	}

	/* 	if (priceAddedToCartWidget) {
		const existingTotalPriceElement = cartWidgetButton.querySelector(".cart-total-price-wrapper");
		if (existingTotalPriceElement) {
			const totalPriceStrong = existingTotalPriceElement.querySelector(".cart-total-price");
			if (totalPriceStrong) {
				totalPriceStrong.innerHTML = totalPrice;
			}
		}
		return;
	} */

	let existingTotalPriceElement = cartWidgetButton.querySelector(".cart-total-price-wrapper");
	if (existingTotalPriceElement) {
		existingTotalPriceElement.remove();
	}

	const totalPriceInCartWidgetElement = document.createElement("div");
	totalPriceInCartWidgetElement.className = "cart-total-price-wrapper";

	const totalPriceStrong = document.createElement("strong");
	totalPriceStrong.className = "cart-total-price";
	totalPriceStrong.innerHTML = totalPrice;

	const totalPriceLabel = document.createElement("span");

	totalPriceLabel.innerHTML = translationsStrings.cartTotalLabel[activeLang];

	totalPriceInCartWidgetElement.appendChild(totalPriceLabel);
	totalPriceInCartWidgetElement.appendChild(totalPriceStrong);
	cartWidgetButton.appendChild(totalPriceInCartWidgetElement);
	priceAddedToCartWidget = true;
}

/*-------------------------------------- KOSIK WIDGET - na mobilu rovnou do kosiku*/
addCartWidgetToCartMobileListener();
function addCartWidgetToCartMobileListener() {
	let header = document.querySelector("#header");
	if (!header) {
		console.warn("Header not found.");
		return;
	}
	let cartButton = header.querySelector(".navigation-buttons");
	if (!cartButton) {
		console.warn("Cart button not found.");
		return;
	}
	let cartHrefA = cartButton.querySelector("a");
	if (!cartHrefA) {
		console.warn("Cart button href not found.");
		return;
	}
	let cartHref = cartHrefA.getAttribute("href");
	if (!cartHref) {
		console.warn("Cart button href is empty.");
		return;
	}

	let appliedEvents = ["click", "touchstart"];

	appliedEvents.forEach(function (eventType) {
		cartButton.addEventListener(eventType, function (event) {
			if (!isDesktop) {
				event.preventDefault();
				console.log("Cart button clicked on mobile, redirecting to cart page.");
				window.location.href = cartHref;
			} else {
				console.log("Cart button clicked on desktop, no action needed.");
			}
		});
	});
}
