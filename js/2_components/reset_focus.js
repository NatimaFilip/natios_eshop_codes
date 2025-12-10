function resetFocus() {
	setTimeout(() => {
		if (document.activeElement && document.activeElement !== document.body) {
			document.activeElement.blur();
		}
	}, 1);
}

document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	resetFocus();
});
