function resetFocus() {
	setTimeout(() => {
		document.body.focus();
	}, 100);
}

document.addEventListener("ShoptetDOMContentLoaded", () => {
	resetFocus();
});
document.addEventListener("ShoptetDOMPageMoreProductsLoaded", () => {
	resetFocus();
});
