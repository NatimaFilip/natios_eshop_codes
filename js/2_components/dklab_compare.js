/*Zmena default pozice kam se umistuje doplnek*/
dkLabPorovnavacZboziDataLayer.template.classic.selectors.headerIconAddBefore = "#header .header-top .site-name-wrapper";

/*zjisteni, kolik produktu je v porovnani*/
document.addEventListener("dkLabProductComparerHeaderChanged", function () {
	let compareInHeader = document.querySelector("#header #dkLabComparerHeaderWrappper");
	if (!compareInHeader) return;

	let compareSpan = compareInHeader.querySelector("span.dkLabComparerHeaderIconBtn ");
	if (!compareSpan) return;

	const compareTextSpan = document.createElement("span");
	compareTextSpan.textContent = translationsStrings.compare[activeLang];
	compareSpan.prepend(compareTextSpan);

	let em = compareInHeader.querySelector("em");
	if (!em) {
		compareInHeader.classList.add("no-count");
	} else {
		compareInHeader.classList.remove("no-count");
	}

	compareSpan.addEventListener("click", function (e) {
		//dispatch event "CompareSpanClicked"
		const event = new Event("dkLabCompareHeaderIconClicked");
		document.dispatchEvent(event);
		console.log(
			"%c dkLabCompareHeaderIconClicked event dispatched ",
			"background: lime; color: black; padding: 5px 10px; font-weight: bold;"
		);
	});
});

document.addEventListener("dkLabCompareHeaderIconClicked", function () {
	setTimeout(() => {
		let dkLabComparerTableDiv = document.querySelector("#dkLabComparerTableDiv");
		if (!dkLabComparerTableDiv) return;

		let dkLabComparerTable = dkLabComparerTableDiv.querySelector("table#dkLabComparerTable");
		if (!dkLabComparerTable) return;

		// Transform table into grid layout
		transformTableToGrid(dkLabComparerTable, dkLabComparerTableDiv);
	}, 100);
});

function transformTableToGrid(table, container) {
	const rows = Array.from(table.querySelectorAll("tbody tr"));
	if (rows.length === 0) return;

	// Get number of columns from first row
	const firstRow = rows[0];
	const columnCount = firstRow.querySelectorAll("td").length;

	// Separate rows by type
	let imageRow = null;
	let buttonRow = null;
	const otherRows = [];

	rows.forEach((row) => {
		const hasButton = row.querySelector("button.btn-cart");
		const hasImage = row.querySelector(".dkLabComparerImage");

		if (hasButton) {
			buttonRow = row;
		} else if (hasImage) {
			imageRow = row;
		} else {
			otherRows.push(row);
		}
	});

	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.className = "dklab-comparer-grid-container";
	gridContainer.style.gridTemplateColumns = `repeat(${columnCount}, auto)`;

	// Helper function to add row cells to grid
	const addRowToGrid = (row) => {
		const cells = row.querySelectorAll("td");
		cells.forEach((cell, colIndex) => {
			const gridItem = document.createElement("div");
			gridItem.className = "dklab-comparer-grid-item";

			// Add special classes based on column position
			if (colIndex === 0) {
				gridItem.classList.add("label-column");
			} else {
				gridItem.classList.add("product-column");
			}

			// Add special classes for specific cell types
			if (cell.classList.contains("dkLabComparerImage")) {
				gridItem.classList.add("image-cell");
			}
			if (cell.querySelector("button.btn-cart")) {
				gridItem.classList.add("button-cell");
			}
			if (cell.querySelector(".dkLabComparerProductName")) {
				gridItem.classList.add("title-cell");
			}

			// Copy cell content
			gridItem.innerHTML = cell.innerHTML;

			gridContainer.appendChild(gridItem);
		});
	};

	// Add image row first if it exists
	if (imageRow) {
		addRowToGrid(imageRow);
	}

	// Add other rows in the middle
	otherRows.forEach((row) => {
		addRowToGrid(row);
	});

	// Add button row last if it exists
	if (buttonRow) {
		addRowToGrid(buttonRow);
	}

	// Replace table with grid container
	table.style.display = "none";
	container.appendChild(gridContainer);
}
