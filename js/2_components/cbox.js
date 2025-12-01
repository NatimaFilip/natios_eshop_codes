// Close colorbox when clicking outside content area
document.addEventListener("click", function (e) {
	const colorbox = document.querySelector("#colorbox");
	if (!colorbox) return;

	const cboxContent = document.querySelector("#cboxContent");
	if (!cboxContent) return;

	// Check if click is on colorbox but not on cboxContent or its children
	if (e.target === colorbox || e.target === document.querySelector("#cboxWrapper")) {
		const cboxClose = document.querySelector("#cboxClose");
		if (cboxClose) {
			cboxClose.click();
		}
	}
});
