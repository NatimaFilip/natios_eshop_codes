function resetFocus() {
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
