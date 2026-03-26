if (body.classList.contains("in-jak-uzivat-doplnky-natios")) {
	document.addEventListener("DOMContentLoaded", function () {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.1.0";
		document.body.appendChild(script);
		script.onload = init;

		addHeadingsToBody();
		unveilRows();
		buttonListener();
	});

	function addHeadingsToBody() {
		const headings = Array.from(document.querySelectorAll("#natios-manual thead th")).map((th) =>
			th.textContent.trim(),
		);
		document.querySelectorAll("#natios-manual tbody tr").forEach((row) => {
			Array.from(row.cells).forEach((td, i) => {
				if (headings[i]) {
					const span = document.createElement("span");
					span.className = "td-heading";
					span.textContent = headings[i];
					td.prepend(span);
				}
			});
		});
	}

	function unveilRows() {
		document.querySelectorAll("#natios-manual tbody tr").forEach((row) => {
			row.addEventListener("click", () => {
				row.classList.toggle("unveiled");
			});
		});
	}

	// Prepares a cell for highlighting. If it has an <a>, uses that as the highlight target
	// (preserving href and sibling spans). Otherwise wraps bare text nodes in a .cell-text span.
	function prepareCell(cell) {
		if (!cell) return "";
		const link = cell.querySelector("a");
		if (link) {
			link.dataset.searchText = link.textContent.trim();
			return link.dataset.searchText;
		}
		const nodes = Array.from(cell.childNodes).filter(
			(n) => !(n.nodeType === Node.ELEMENT_NODE && n.classList.contains("td-heading")),
		);
		const text = nodes
			.map((n) => n.textContent)
			.join("")
			.trim();
		nodes.forEach((n) => n.remove());
		const span = document.createElement("span");
		span.className = "cell-text";
		span.textContent = text;
		span.dataset.searchText = text;
		cell.appendChild(span);
		return text;
	}

	function getHighlightTarget(cell) {
		return cell?.querySelector("a") ?? cell?.querySelector(".cell-text") ?? null;
	}

	function highlightText(text, indices) {
		const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		let result = "";
		let last = 0;
		[...indices]
			.sort((a, b) => a[0] - b[0])
			.forEach(([start, end]) => {
				result += escape(text.slice(last, start));
				result += "<mark>" + escape(text.slice(start, end + 1)) + "</mark>";
				last = end + 1;
			});
		result += escape(text.slice(last));
		return result;
	}

	function applyHighlights(row, matches) {
		clearHighlights(row);
		const keyToCell = { product: 1, indication: 2 };
		matches.forEach((match) => {
			const ci = keyToCell[match.key];
			if (ci === undefined) return;
			const target = getHighlightTarget(row.cells[ci]);
			if (!target) return;
			target.innerHTML = highlightText(target.dataset.searchText ?? "", match.indices);
		});
	}

	function clearHighlights(row) {
		[1, 2].forEach((i) => {
			const target = getHighlightTarget(row.cells[i]);
			if (target) target.textContent = target.dataset.searchText ?? "";
		});
	}

	function init() {
		const fuseOptions = {
			isCaseSensitive: false,
			includeScore: false,
			shouldSort: true,
			includeMatches: true,
			findAllMatches: false,
			minMatchCharLength: 2,
			location: 0,
			threshold: 0.1,
			distance: 400,
			useExtendedSearch: false,
			ignoreLocation: true,
			ignoreFieldNorm: false,
			fieldNormWeight: 0.5,
			keys: ["product", "indication"],
		};

		const rows = Array.from(document.querySelectorAll("#natios-manual tbody tr"));

		const data = rows.map((row) => ({
			product: prepareCell(row.cells[1]),
			indication: prepareCell(row.cells[2]),
			row,
		}));

		const fuse = new Fuse(data, fuseOptions);

		document.getElementById("fuse-input").addEventListener("input", function () {
			const query = this.value.trim();

			if (!query) {
				rows.forEach((row) => {
					row.classList.remove("hidden", "active");
					clearHighlights(row);
				});
				return;
			}

			const results = fuse.search(query);
			const matchMap = new Map(results.map((r) => [r.item.row, r.matches]));

			rows.forEach((row) => {
				if (matchMap.has(row)) {
					row.classList.add("active");
					row.classList.remove("hidden");
					applyHighlights(row, matchMap.get(row));
				} else {
					row.classList.add("hidden");
					row.classList.remove("active");
					clearHighlights(row);
				}
				if (row.classList.contains("unveiled")) {
					row.classList.remove("unveiled");
				}
			});
		});
	}

	function buttonListener() {
		let fuseSearchButton = document.querySelector("#fuse-search-button");
		if (!fuseSearchButton) {
			return;
		}

		fuseSearchButton.addEventListener("click", function () {
			scrollToElement(fuseSearchButton);
		});
	}
}
