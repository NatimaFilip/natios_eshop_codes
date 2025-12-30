function positionOfFixedComponent(
	componentWithStyles,
	componentToReadPositionFrom,
	componentToAddListeners,
	componentForTopPadding,
	listenerOnMouseEnter
) {
	if (!componentWithStyles || !componentToReadPositionFrom || !componentToAddListeners) {
		console.warn("positionOfFixedComponent failed because some required components are missing.");
		return;
	}

	if (listenerOnMouseEnter) {
		componentToAddListeners.addEventListener("mouseenter", function () {
			applyPosition();
		});
	}

	componentToAddListeners.addEventListener("click", function () {
		applyPosition();
	});

	function applyPosition() {
		let topPosition = componentToReadPositionFrom.getBoundingClientRect().bottom;
		let rightPosition = window.innerWidth - componentToReadPositionFrom.getBoundingClientRect().right - scrollbarWidth;
		componentWithStyles.style.top = topPosition + "px";
		componentWithStyles.style.right = rightPosition + "px";

		if (componentForTopPadding) {
			let bottomSpaceOfComponent =
				componentForTopPadding.getBoundingClientRect().bottom -
				componentToReadPositionFrom.getBoundingClientRect().bottom;

			componentWithStyles.style.setProperty("--pad-top", bottomSpaceOfComponent + "px");
		}
	}
}
