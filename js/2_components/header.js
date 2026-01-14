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
	copyFooterLinksToHeader();
	detectHeaderHeight();
	stickyHeaderAdjustments();
	addSearchButtonForMobile();
});

document.addEventListener("debouncedResize", function () {
	hamburgerMenuLogic();
	detectHeaderHeight();
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

function detectHeaderHeight() {
	let header = document.querySelector("#header");
	if (!header) return;

	let headerHeight = header.offsetHeight;
	body.style.setProperty("--header-height", headerHeight + "px");

	if (body.classList.contains("admin-logged")) {
		let adminBarHeight = 0;
		let adminBar = document.querySelector(".admin-bar");
		if (adminBar) {
			adminBarHeight = adminBar.offsetHeight;
		}
		body.style.setProperty("--admin-bar-height", adminBarHeight + "px");
	}
}

function copyFooterLinksToHeader() {
	let customerLinks = document.querySelector(".customer-links");
	let aboutUsLinks = document.querySelector(".about-us-links");
	let headerTopMenuLevel1 = document.querySelector("#header .menu-helper .menu-level-1");

	if (headerTopMenuLevel1) {
		if (customerLinks) {
			const customerLinksClone = customerLinks.cloneNode(true);
			customerLinksClone.classList.add("customer-links-clone");
			headerTopMenuLevel1.appendChild(customerLinksClone);
		}
	}
	if (headerTopMenuLevel1) {
		if (aboutUsLinks) {
			const aboutUsLinksClone = aboutUsLinks.cloneNode(true);
			aboutUsLinksClone.classList.add("about-us-links-clone");
			headerTopMenuLevel1.appendChild(aboutUsLinksClone);
		}
	}
}

function stickyHeaderAdjustments() {
	let header = document.querySelector("#header");
	if (!header) return;

	let lastScrollTop = 0;
	let scrollThreshold = header.offsetHeight / 2;
	let scrollDownThreshold = 20;
	let scrollUpThreshold = 20;

	window.addEventListener("scroll", function () {
		let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScrollTop > scrollThreshold) {
			if (currentScrollTop - lastScrollTop >= scrollDownThreshold) {
				body.classList.add("sticky-header-hidden");
			} else if (lastScrollTop - currentScrollTop >= scrollUpThreshold) {
				body.classList.remove("sticky-header-hidden");
			}
		} else {
			body.classList.remove("sticky-header-hidden");
		}

		lastScrollTop = currentScrollTop;
	});
}

function addSearchButtonForMobile() {
	let headerSearch = document.querySelector("#header .search");
	if (!headerSearch) return;

	let headerTop = document.querySelector("#header .header-top");
	if (!headerTop) return;

	const searchButton = document.createElement("div");
	searchButton.classList.add("mobile-search-button");
	headerTop.appendChild(searchButton);

	searchButton.addEventListener("click", function () {
		headerSearch.classList.toggle("active-mobile-search");

		let queryInput = headerSearch.querySelector("input[type='search']");
		if (queryInput) {
			//timeout 10ms to wait for the animation to finish
			setTimeout(() => {
				queryInput.focus();
			}, 10);
		}

		let searchHeight = headerSearch.offsetHeight;
		body.style.setProperty("--mobile-search-height", searchHeight + "px");
	});
}
