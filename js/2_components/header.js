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

		let loginBtn = topNavigationBar.querySelector(".top-nav-button");

		if (loginBtn) {
			headerTop.appendChild(loginBtn);
		}
	}
}

let initializedHamburgerMenu = false;
document.addEventListener("DOMContentLoaded", function () {
	hamburgerMenuLogic();
});

document.addEventListener("debouncedResize", function () {
	hamburgerMenuLogic();
});

function hamburgerMenuLogic() {
	if (initializedHamburgerMenu) return;

	if (!isSmallTablet) return;

	let menuHelper = document.querySelector(".menu-helper");
	if (!menuHelper) return;

	initializedHamburgerMenu = true;

	let menuHelperSpan = menuHelper.querySelector(":scope > span");

	menuHelperSpan.addEventListener("click", function () {
		body.classList.toggle("has-opened-hamburger-menu");

		if (!body.classList.contains("has-opened-hamburger-menu")) {
			closeOpenedExtLi();
			menuHelper.classList.remove("has-opened-menu-level-1");
		}
	});

	let allExt = menuHelper.querySelectorAll("li.ext");
	if (allExt.length > 0) {
		allExt.forEach(function (extLi) {
			const showMoreExtLiSpan = document.createElement("span");
			showMoreExtLiSpan.classList.add("show-more-ext-li");
			extLi.append(showMoreExtLiSpan);

			showMoreExtLiSpan.addEventListener("click", function (e) {
				e.stopPropagation();

				const isCurrentlyOpen = extLi.classList.contains("opened-ext-li");

				closeOpenedExtLi();
				menuHelper.classList.remove("has-opened-menu-level-1");

				if (!isCurrentlyOpen) {
					extLi.classList.add("opened-ext-li");
					menuHelper.classList.add("has-opened-menu-level-1");
				}
			});

			extLi.addEventListener("click", function (e) {
				if (
					extLi.classList.contains("opened-ext-li") &&
					!e.target.closest(".show-more-ext-li") &&
					!e.target.closest(".menu-level-2")
				) {
					closeOpenedExtLi();
					menuHelper.classList.remove("has-opened-menu-level-1");
				}
			});
		});
	}

	function closeOpenedExtLi() {
		let existingOpenedExtLi = menuHelper.querySelectorAll("li.opened-ext-li");
		if (existingOpenedExtLi.length > 0) {
			existingOpenedExtLi.forEach(function (openedLi) {
				openedLi.classList.remove("opened-ext-li");
			});
		}
	}
}
