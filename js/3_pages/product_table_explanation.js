function analysisTableExplanation() {
	const analysisContentRight = document.querySelector(".natios-analysis-content-right");
	if (!analysisContentRight) return;

	analysisContentRight.classList.add("test-element");

	let currentUl = null;
	let currentActiveFourthTd = null;

	// 1) Global clearer: runs BEFORE bubbling handlers (capture phase)
	document.addEventListener(
		"click",
		(e) => {
			if (currentUl) {
				const clickedInsideUl = currentUl.contains(e.target);
				const td = e.target.closest("td");
				const insideanalysisContentRight = analysisContentRight.contains(e.target);
				const isFourthTd = !!td && td.cellIndex === 3;
				const isFifthTd = !!td && td.cellIndex === 4;

				// keep open if clicking the floating UL itself
				if (clickedInsideUl) return;
				// let the container handler manage clicks on a 4th td
				if (insideanalysisContentRight && isFourthTd) return;
				// ignore clicks on a 5th td inside the container
				if (insideanalysisContentRight && isFifthTd) return;

				// Otherwise remove currentUl and clear active state
				currentUl.remove();
				currentUl = null;
				if (currentActiveFourthTd) {
					currentActiveFourthTd.classList.remove("active");
					currentActiveFourthTd = null;
				}
			}
		},
		true
	);

	// 2) Inside-container logic: activate the 5th td's UL when 4th td is clicked
	analysisContentRight.addEventListener("click", (e) => {
		const td = e.target.closest("td");
		if (!td || !analysisContentRight.contains(td)) return;

		const isFourthTd = td.cellIndex === 3; // zero-based
		if (isFourthTd) {
			// Toggle behavior: if clicking the same active 4th td, close it
			if (currentActiveFourthTd === td) {
				if (currentUl) {
					currentUl.remove();
					currentUl = null;
				}
				td.classList.remove("active");
				currentActiveFourthTd = null;
				return;
			}

			// Clear any existing open UL and active 4th td
			if (currentUl) {
				currentUl.remove();
				currentUl = null;
			}
			if (currentActiveFourthTd) {
				currentActiveFourthTd.classList.remove("active");
				currentActiveFourthTd = null;
			}

			const fifthTd = td.parentElement.querySelector("td:nth-child(5)");
			if (!fifthTd) return;

			const ul = fifthTd.querySelector("ul");
			if (!ul) return;

			// clone and append the ul to body
			currentUl = ul.cloneNode(true);
			currentUl.style.position = "absolute";
			currentUl.classList.add("active-table-explanation");

			// position it relative to the 4th td clicked
			const rect = td.getBoundingClientRect();
			currentUl.style.top = rect.bottom + window.scrollY - rect.height - 5 + "px";
			currentUl.style.right = window.innerWidth - rect.right - window.scrollX + "px";

			document.body.appendChild(currentUl);

			// mark the 4th td as active
			td.classList.add("active");
			currentActiveFourthTd = td;
		}
	});
}

if (body.classList.contains("type-product")) {
	analysisTableExplanation();
}
