function moveRelatedFilesToAnalysis() {
	let relatedFiles = document.querySelector("#relatedFiles");
	if (!relatedFiles) return;

	const natiosAnalysis = document.querySelector(".product-widgets .natios-analysis .natios-analysis-content-left");
	if (natiosAnalysis) {
		let allHrefsInRelatedFiles = relatedFiles.querySelectorAll("a:not(.btn)");
		if (allHrefsInRelatedFiles && allHrefsInRelatedFiles.length > 0) {
			allHrefsInRelatedFiles.forEach((a) => {
				// Remove any text in parentheses with "kB" or "MB" etc.
				a.textContent = a.textContent.replace(/\(\s*[\d.,]+\s*[kMGT]?B\s*\)/gi, "").trim();
			});
		}
		natiosAnalysis.appendChild(relatedFiles);
		const showTestsButton = natiosAnalysis.querySelector(".show-tests-button");
		if (showTestsButton) {
			showTestsButton.remove();
		}
	}
	/*Zatím nic*/
	/* else {
		const basicDescription = document.querySelector("#description .basic-description");
		if (basicDescription) {
			basicDescription.insertAdjacentElement("afterend", relatedFiles);
		}
	} */
}

if (body.classList.contains("type-product")) {
	moveRelatedFilesToAnalysis();
}
