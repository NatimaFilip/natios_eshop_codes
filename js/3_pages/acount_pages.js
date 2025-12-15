if (body.classList.contains("customer-page")) {
	removeMojeFromSidebar();
}

function removeMojeFromSidebar() {
	const sidebar = document.querySelector(".sidebar");
	if (!sidebar) return;

	const links = sidebar.querySelectorAll("li a");
	const excludedTexts = ["Moje slevy", "Moje hodnocení u produktů"];

	links.forEach((link) => {
		const text = link.textContent.trim();

		// Skip if it's one of the excluded texts
		if (excludedTexts.includes(text)) return;

		// Remove "Moje " from the beginning and trim
		if (text.startsWith("Moje ")) {
			let newText = text.replace(/^Moje\s+/, "").trim();
			// Capitalize first letter
			newText = newText.charAt(0).toUpperCase() + newText.slice(1);
			link.textContent = newText;
		}
	});
}
