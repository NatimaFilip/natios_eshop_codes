/*Zmena default pozice kam se umistuje doplnek*/

if (typeof dkLabPorovnavacZboziDataLayer !== "undefined") {
	dkLabPorovnavacZboziDataLayer.template.classic.selectors.headerIconAddBefore =
		"#header .header-top .site-name-wrapper";

	if (isSmallTablet) {
		dkLabPorovnavacZboziDataLayer.template.classic.selectors.headerIconAddBefore =
			"#header .menu-helper .menu-level-1 > li:first-of-type";
	}
	dkLabPorovnavacZboziDataLayer.template.classic.selectors.detailAddLinkDivAfter =
		".product-top .social-buttons-wrapper .link-icons";

	document.addEventListener("debouncedResize", function () {
		dkLabPorovnavacZboziDataLayer.template.classic.selectors.headerIconAddBefore =
			"#header .header-top .site-name-wrapper";

		if (!isSmallTablet) {
			let existingCompInHeader = document.querySelector(
				"#header .menu-helper .menu-level-1 #dkLabComparerHeaderWrappper"
			);
			if (existingCompInHeader) {
				let headerTop = document.querySelector("#header .header-top");
				if (!headerTop) return;
				headerTop.prepend(existingCompInHeader);
			}
		}

		if (isSmallTablet) {
			dkLabPorovnavacZboziDataLayer.template.classic.selectors.headerIconAddBefore =
				"#header .menu-helper .menu-level-1 > li:first-of-type";

			let existingCompInHeader = document.querySelector(".header-top #dkLabComparerHeaderWrappper");
			if (existingCompInHeader) {
				let menuLevel1 = document.querySelector("#header .menu-helper .menu-level-1");
				if (!menuLevel1) return;
				menuLevel1.prepend(existingCompInHeader);
			}
		}
	});
}

/*zjisteni, kolik produktu je v porovnani*/
let lastEm = 0;
let compareLoadedFirstTime = true;
document.addEventListener("dkLabProductComparerHeaderChanged", function () {
	let compareInHeader = document.querySelector("#header #dkLabComparerHeaderWrappper");
	if (!compareInHeader) return;

	let compareSpan = compareInHeader.querySelector("span.dkLabComparerHeaderIconBtn");
	if (!compareSpan) return;

	const compareTextSpan = document.createElement("span");
	compareTextSpan.textContent = translationsStrings.compare[activeLang];
	compareSpan.prepend(compareTextSpan);

	let em = compareInHeader.querySelector("em");
	let emText = em ? em.textContent : "0";
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

	if (emText >= "2" && emText > lastEm && compareLoadedFirstTime === false) {
		compareSpan.click();
	}
	lastEm = emText;
	compareLoadedFirstTime = false;
});

document.addEventListener("dkLabCompareHeaderIconClicked", function () {
	// Wait for table to appear in colorbox
	const colorbox = document.querySelector("#colorbox");
	if (!colorbox) return;

	const observer = new MutationObserver((_, obs) => {
		let dkLabComparerTableDiv = document.querySelector("#dkLabComparerTableDiv");
		if (!dkLabComparerTableDiv) return;

		let dkLabComparerTable = dkLabComparerTableDiv.querySelector("table#dkLabComparerTable");
		if (!dkLabComparerTable) return;

		// Table found, disconnect observer and proceed
		obs.disconnect();

		// Transform table into grid layout
		transformTableToGrid(dkLabComparerTable, dkLabComparerTableDiv);
		setupCloseButtons();
	});

	observer.observe(colorbox, {
		childList: true,
		subtree: true,
	});

	function setupCloseButtons() {
		let closeBtnsInImage = document.querySelectorAll(".dkLabComparerImage >span");
		if (closeBtnsInImage && closeBtnsInImage.length > 0) {
			closeBtnsInImage.forEach((btn) => {
				btn.addEventListener("click", function () {
					const event = new Event("dkLabCompareCloseButtonClicked");
					document.dispatchEvent(event);
					console.log(
						"%c dkLabCompareCloseButtonClicked event dispatched ",
						"background: orange; color: black; padding: 5px 10px; font-weight: bold;"
					);

					// Wait for table to update after close button click
					const updateObserver = new MutationObserver((_, obs) => {
						let dkLabComparerTableDiv = document.querySelector("#dkLabComparerTableDiv");
						if (!dkLabComparerTableDiv) return;

						let dkLabComparerTable = dkLabComparerTableDiv.querySelector("table#dkLabComparerTable");
						if (!dkLabComparerTable) return;

						obs.disconnect();
						transformTableToGrid(dkLabComparerTable, dkLabComparerTableDiv);
						setupCloseButtons();
					});

					updateObserver.observe(colorbox, {
						childList: true,
						subtree: true,
					});
				});
			});
		}
	}
});

function transformTableToGrid(table, container) {
	const rows = Array.from(table.querySelectorAll("tr"));
	if (rows.length === 0) return;

	// Remove existing grid if it exists
	const existingGrid = container.querySelector(".dklab-comparer-grid");
	if (existingGrid) {
		return;
	}

	// Remove existing scroll controls if they exist
	const existingControls = container.querySelectorAll(".dklab-comparer-control");
	existingControls.forEach((control) => control.remove());

	// Get number of columns from the first row
	const columnCount = rows[0].querySelectorAll("td").length;

	// Find the image row (row with .dkLabComparerImage) and button row
	let imageRowIndex = -1;
	let buttonRowIndex = -1;

	rows.forEach((row, index) => {
		if (row.querySelector(".dkLabComparerImage")) {
			imageRowIndex = index;
		}
		if (row.querySelector("button.btn-cart")) {
			buttonRowIndex = index;
		}
	});

	// Create grid container
	const gridContainer = document.createElement("div");
	gridContainer.className = "dklab-comparer-grid";

	// Build grid template: first column 150px, rest are 260px with auto
	const gridColumns = ["180px"];
	for (let i = 1; i < columnCount; i++) {
		gridColumns.push("270px");
	}
	gridContainer.style.gridTemplateColumns = gridColumns.join(" ");

	// Reorder rows: image first, button last, others in between
	const orderedRows = [];

	if (imageRowIndex !== -1) {
		orderedRows.push(rows[imageRowIndex]);
	}

	rows.forEach((row, index) => {
		if (index !== imageRowIndex && index !== buttonRowIndex) {
			orderedRows.push(row);
		}
	});

	if (buttonRowIndex !== -1) {
		orderedRows.push(rows[buttonRowIndex]);
	}

	// Find price row index in orderedRows
	let priceRowIndex = -1;
	orderedRows.forEach((row, index) => {
		const cells = Array.from(row.querySelectorAll("td"));
		if (cells.some((cell) => cell.textContent.trim().match(/\d+\s*(Kč|zł|€|Eur)/))) {
			priceRowIndex = index;
		}
	});

	orderedRows.forEach((row, rowIndex) => {
		const cells = row.querySelectorAll("td");
		const hasImageCell = row.querySelector(".dkLabComparerImage");
		const hasProductName = row.querySelector(".dkLabComparerProductName");
		const hasPrice = Array.from(cells).some((cell) => cell.textContent.trim().match(/\d+\s*(Kč|zł|€|Eur)/));
		const hasButton = row.querySelector("button.btn-cart");

		const isFirstParameterRow = priceRowIndex !== -1 && rowIndex === priceRowIndex + 1;

		cells.forEach((cell, cellIndex) => {
			const gridItem = document.createElement("div");
			gridItem.className = "dklab-comparer-grid-item";
			gridItem.innerHTML = cell.innerHTML;

			// Preserve classes from original cell
			if (cell.className) {
				gridItem.classList.add(...cell.className.split(" "));
			}

			// Add no-bg class to first column
			if (cellIndex === 0) {
				gridItem.classList.add("no-bg");
			}

			// Add first-parameter class to first row after price row
			if (isFirstParameterRow) {
				gridItem.classList.add("first-parameter");
			}

			// Add dkLabComparerImage class to first column if row has image cells
			if (hasImageCell && cellIndex === 0) {
				gridItem.classList.add("dkLabComparerImage");
			}

			// Add class for product names
			if (cell.querySelector(".dkLabComparerProductName")) {
				gridItem.classList.add("dklab-comparer-product-name");
			}

			// Add dklab-comparer-product-name to first column if row has product names
			if (hasProductName && cellIndex === 0) {
				gridItem.classList.add("dklab-comparer-product-name");
			}

			// Add class for prices (detect currency symbols)
			const cellText = cell.textContent.trim();
			if (cellText.match(/\d+\s*(Kč|zł|€|Eur)/)) {
				gridItem.classList.add("dklab-comparer-price");
			}

			// Add dklab-comparer-price to first column if row has prices
			if (hasPrice && cellIndex === 0) {
				gridItem.classList.add("dklab-comparer-price");
			}

			// Add class for buttons
			if (cell.querySelector("button.btn-cart")) {
				gridItem.classList.add("dklab-comparer-button");
			}

			// Add dklab-comparer-button to first column if row has buttons
			if (hasButton && cellIndex === 0) {
				gridItem.classList.add("dklab-comparer-button");
			}

			gridContainer.appendChild(gridItem);
		});
	});

	// Replace table with grid
	table.style.display = "none";
	container.appendChild(gridContainer);

	// Add scroll controls if there's horizontal overflow
	addScrollControls(container);
}

function addScrollControls(container) {
	// Check if container has horizontal overflow
	const hasOverflow = container.scrollWidth > container.clientWidth;

	if (!hasOverflow) return;

	// Create left control
	const controlLeft = document.createElement("div");
	controlLeft.classList.add("dklab-comparer-control", "left");

	// Create right control
	const controlRight = document.createElement("div");
	controlRight.classList.add("dklab-comparer-control", "right");

	// Update controls visibility based on scroll position
	function updateControls() {
		const scrollLeft = container.scrollLeft;
		const maxScroll = container.scrollWidth - container.clientWidth;

		if (scrollLeft > 0) {
			controlLeft.style.opacity = "1";
			controlLeft.style.pointerEvents = "auto";
		} else {
			controlLeft.style.opacity = "0";
			controlLeft.style.pointerEvents = "none";
		}

		if (scrollLeft < maxScroll - 1) {
			controlRight.style.opacity = "1";
			controlRight.style.pointerEvents = "auto";
		} else {
			controlRight.style.opacity = "0";
			controlRight.style.pointerEvents = "none";
		}
	}

	// Scroll left
	controlLeft.addEventListener("click", function () {
		container.scrollBy({ left: -270, behavior: "smooth" });
	});

	// Scroll right
	controlRight.addEventListener("click", function () {
		container.scrollBy({ left: 270, behavior: "smooth" });
	});

	// Listen to scroll events
	container.addEventListener("scroll", updateControls);

	// Append controls
	container.appendChild(controlLeft);
	container.appendChild(controlRight);

	// Initial update
	updateControls();
}
