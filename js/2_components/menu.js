/*-------------------------------------- MENU OVERFLOW DETECTION*/
let menuLevelOne = document.querySelector(".menu-level-1");

function createMenuHelper() {
	if (document.querySelector(".menu-helper-custom")) {
		return;
	}
	const menuHelperCustom = document.createElement("div");
	menuHelperCustom.className = "menu-helper-custom";

	const menuHelperCustomText = document.createElement("span");
	menuHelperCustom.appendChild(menuHelperCustomText);
	menuHelperCustomText.textContent = translationsStrings.more[activeLang];

	const menuHelperCustomSubmenu = document.createElement("ul");
	menuHelperCustomSubmenu.className = "menu-helper-custom-submenu";
	menuHelperCustom.appendChild(menuHelperCustomSubmenu);

	if (menuLevelOne) {
		menuLevelOne.appendChild(menuHelperCustom);
	}
}

function inicializeMenu() {
	createMenuHelper();
	let menuHelperCustom = document.querySelector(".menu-helper-custom");
	let menuHelperCustomSubmenu = menuHelperCustom.querySelector(".menu-helper-custom-submenu");
	if (!menuLevelOne || !menuHelperCustom || !menuHelperCustomSubmenu) {
		return;
	}

	if (isMobile) {
		let menuLevelOneLis = menuLevelOne.querySelectorAll(":scope>li:not(.menu-helper-custom)");
		for (let i = 0; i < menuLevelOneLis.length; i++) {
			menuHelperCustomSubmenu.prepend(menuLevelOneLis[menuLevelOneLis.length - 1 - i]);
		}
		menuHelperCustom.classList.add("active");
		return;
	}

	/*Initial state*/
	menuHelperCustom.classList.remove("active");
	menuHelperCustomSubmenu.querySelectorAll(":scope>li").forEach((li) => {
		menuLevelOne.appendChild(li);
	});
	menuLevelOne.appendChild(menuHelperCustom);
	let menuLevelOneLis = menuLevelOne.querySelectorAll(":scope>li:not(.menu-helper-custom)");
	let overflownItems = false;
	let overflownIndex = -1;
	const menuLevelOneWidth = menuLevelOne.offsetWidth;
	const menuHelperCustomWidth = menuHelperCustom.offsetWidth;
	let cumulativeWidth = 0;

	//Detect overflown items
	for (let i = 0; i < menuLevelOneLis.length; i++) {
		const li = menuLevelOneLis[i];
		cumulativeWidth += li.offsetWidth;
		if (cumulativeWidth > menuLevelOneWidth) {
			overflownItems = true;
			overflownIndex = i;
			break;
		}
	}

	if (!overflownItems) {
		return;
	}

	//calculate if helper fits
	cumulativeWidth = menuHelperCustomWidth + cumulativeWidth;
	if (cumulativeWidth > menuLevelOneWidth) {
		overflownIndex = overflownIndex - 1;
	}

	//move overflown items to helper
	for (let i = overflownIndex; i < menuLevelOneLis.length; i++) {
		const li = menuLevelOneLis[i];
		menuHelperCustomSubmenu.appendChild(li);
	}
	menuHelperCustom.classList.add("active");
}

/*Edit menu-level-2 href and img*/
function editMenuLevel2() {
	let menusLevel2 = document.querySelectorAll("#header .menu-level-2");
	if (!menusLevel2 || menusLevel2.length === 0) {
		return;
	}

	menusLevel2.forEach((menu) => {
		let childrenLi = menu.querySelectorAll(":scope>li");
		if (!childrenLi || childrenLi.length === 0) {
			return;
		}
		childrenLi.forEach((li) => {
			let img = li.querySelector(":scope>a>img");
			if (img) {
				li.prepend(img);
			}
		});
	});
}

/*Move cart next to menu*/
function moveCartNextToMenu() {
	let cart = document.querySelector("#header .navigation-buttons");
	let navigation = document.querySelector("#header #navigation");
	if (cart && navigation) {
		navigation.appendChild(cart);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	moveCartNextToMenu();
	inicializeMenu();
	editMenuLevel2();
});

document.addEventListener("debouncedResize", function () {
	inicializeMenu();
});
