function resetFocus() {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			if (document.activeElement && document.activeElement !== document.body) {
				document.activeElement.blur();
			}
		});
	});
}

document.addEventListener("ShoptetDOMPageContentLoaded", () => {
	resetFocus();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	resetFocus();
});

/* function resetFocus() {
	setTimeout(() => {
		if (document.activeElement && document.activeElement !== document.body) {
			document.activeElement.blur();
		}
	}, 1);
}

document.addEventListener("ShoptetDOMPageContentLoaded", () => {
	resetFocus();
});

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	resetFocus();
});
 */
