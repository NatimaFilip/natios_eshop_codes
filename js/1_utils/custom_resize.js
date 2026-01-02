// Debounce function to limit the rate at which a function can fire
let resizeTimer;
let lastWindowWidth = window.innerWidth;

window.addEventListener("resize", function () {
	if (window.innerWidth !== lastWindowWidth) {
		document.dispatchEvent(new CustomEvent("resizeX"));

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			lastWindowWidth = window.innerWidth;

			console.log(
				"%c CUSTOM EVENT DISPATCHED: debouncedResize ",
				"background: lime; color: black; padding: 5px 10px; font-weight: bold;"
			);
			document.dispatchEvent(new CustomEvent("debouncedResize"));
		}, 250);
	}
});
