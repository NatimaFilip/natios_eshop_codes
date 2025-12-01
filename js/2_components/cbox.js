// Close colorbox when clicking outside content area
function setupColorboxClose() {
	const colorbox = document.querySelector("#colorbox");
	if (!colorbox || colorbox.hasAttribute("data-close-listener")) return;

	colorbox.setAttribute("data-close-listener", "true");

	colorbox.addEventListener("click", function (e) {
		const cboxContent = this.querySelector("#cboxContent");

		// Check if click is on colorbox, but not on cboxContent or its children
		if (e.target === this || !cboxContent.contains(e.target)) {
			const cboxClose = this.querySelector("#cboxClose");
			if (cboxClose) {
				cboxClose.click();
			}
		}
	});
}

// Try to setup immediately and periodically check
setupColorboxClose();
setInterval(setupColorboxClose, 500);
