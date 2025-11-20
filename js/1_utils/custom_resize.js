// Debounce function to limit the rate at which a function can fire
let resizeTimer;
let lastWindowWidth = window.innerWidth;

window.addEventListener("resize", function () {
	if (window.innerWidth !== lastWindowWidth) {
		document.dispatchEvent(new CustomEvent("resizeX"));

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			lastWindowWidth = window.innerWidth;
			// Dispatch a custom event when X axis resize is complete
			console.log("CUSTOM EVENT DISPATCHED: debouncedResize");
			document.dispatchEvent(new CustomEvent("debouncedResize"));
		}, 250);
	}
});
