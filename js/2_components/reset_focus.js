function resetFocus() {
	if (document.activeElement && document.activeElement !== document.body) {
		document.activeElement.blur();
	}
}

document.addEventListener("ShoptetDOMContentLoaded", () => {
	resetFocus();
});
document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	resetFocus();
});
