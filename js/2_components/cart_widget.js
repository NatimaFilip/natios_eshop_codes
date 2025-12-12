function positionOfCartOnNavigation() {
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
});

/*------------------------------------------------- KOSIK WIDGET - cena celkem do widgetu*/
document.addEventListener("ShoptetDOMCartContentLoaded", function () {
	saveContinueButton();
	insertTotalPriceToCartWidget();
});
let priceAddedToCartWidget = false;
function insertTotalPriceToCartWidget() {
	let header = document.querySelector("#header");
	if (!header) {
		return;
	}
	let totalPrice = header.querySelector(".cart-price").textContent.trim();
	if (!totalPrice) {
		return;
	}

	let cartWidgetButton = document.querySelector("#cart-widget .cart-widget-button");
	if (!cartWidgetButton) {
		return;
	}

	if (priceAddedToCartWidget) {
		const existingTotalPriceElement = cartWidgetButton.querySelector(".cart-total-price-wrapper");
		if (existingTotalPriceElement) {
			const totalPriceStrong = existingTotalPriceElement.querySelector(".cart-total-price");
			if (totalPriceStrong) {
				totalPriceStrong.innerHTML = totalPrice;
			}
		}
		return;
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

	let popupWidgetInner = document.querySelector("#cart-widget .cart-widget-inner");
	if (popupWidgetInner) {
		popupWidgetInner.appendChild(cartWidgetButton);
	}
}

let firstLoadOfCartWidget = true;
let cartWidgetSaveContinueButtonCopy;
function saveContinueButton() {
	if (firstLoadOfCartWidget) {
		let cartWidgetContinueButton = document.querySelector("#cart-widget #cart-continue-button");
		if (cartWidgetContinueButton) {
			cartWidgetSaveContinueButtonCopy = cartWidgetContinueButton.cloneNode(true);
			firstLoadOfCartWidget = false;
		}
	}

	if (!cartWidgetSaveContinueButtonCopy) return;
	if (!firstLoadOfCartWidget) {
		let cartWidget = document.querySelector("#cart-widget");
		cartWidget.appendChild(cartWidgetSaveContinueButtonCopy);
	}
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

	cartButton.addEventListener("click", function (event) {
		if (!isDesktop) {
			console.log("Cart button clicked on mobile, redirecting to cart page.");
			event.preventDefault();
			window.location.href = cartHref;
		} else {
			console.log("Cart button clicked on desktop, no action needed.");
		}
	});
}
