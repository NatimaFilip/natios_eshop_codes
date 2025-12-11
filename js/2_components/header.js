let topNavigationBar = document.querySelector(".top-navigation-bar");
if (topNavigationBar) {
	let headerTop = document.querySelector(".header-top");
	if (headerTop) {
		let projectPhone = topNavigationBar.querySelector(".project-phone");
		if (projectPhone) {
			headerTop.appendChild(projectPhone);

			const contactHours = document.createElement("span");
			contactHours.classList.add("opening-hours");
			contactHours.textContent = translationsStrings.contactHours[activeLang];
			projectPhone.appendChild(contactHours);
		}

		let loginBtn = topNavigationBar.querySelector(".top-nav-button-login");
		if (loginBtn) {
			headerTop.appendChild(loginBtn);
		}
	}
}

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

	let bottomSpaceOfCartNavButton =
		navigation.getBoundingClientRect().bottom - cartNavigationButton.getBoundingClientRect().bottom;

	function applyTopOfCartWidget() {
		let topPosition = cartNavigationButton.getBoundingClientRect().bottom;
		let rightPosition = window.innerWidth - cartNavigationButton.getBoundingClientRect().right - scrollbarWidth;
		cartWidget.style.top = topPosition + "px";
		cartWidget.style.right = rightPosition + "px";
		cartWidget.style.setProperty("--pad-top", bottomSpaceOfCartNavButton + "px");
	}
}

document.addEventListener("DOMContentLoaded", function () {
	positionOfCartOnNavigation();
});
