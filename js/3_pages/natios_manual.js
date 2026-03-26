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

	function prepareCell(cell) {
		if (!cell) return "";
		const link = cell.querySelector("a");
		if (link) {
			link.dataset.searchText = link.textContent.trim();
			return link.dataset.searchText;
		}
		const ul = cell.querySelector("ul");
		if (ul) {
			ul.querySelectorAll("li").forEach((li) => {
				li.dataset.searchText = li.textContent.trim();
			});
			return ul.textContent.trim();
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

	function highlightExact(text, query) {
		const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		const lower = text.toLowerCase();
		const lowerQuery = query.toLowerCase();
		let result = "";
		let last = 0;
		let idx;
		while ((idx = lower.indexOf(lowerQuery, last)) !== -1) {
			result += escape(text.slice(last, idx));
			result += "<mark>" + escape(text.slice(idx, idx + query.length)) + "</mark>";
			last = idx + query.length;
		}
		result += escape(text.slice(last));
		return result;
	}

	function applyHighlights(row, query) {
		clearHighlights(row);
		[1, 2].forEach((i) => {
			const cell = row.cells[i];
			if (!cell) return;
			const ul = cell.querySelector("ul");
			if (ul) {
				ul.querySelectorAll("li").forEach((li) => {
					li.innerHTML = highlightExact(li.dataset.searchText ?? "", query);
				});
				return;
			}
			const target = getHighlightTarget(cell);
			if (target) target.innerHTML = highlightExact(target.dataset.searchText ?? "", query);
		});
	}

	function clearHighlights(row) {
		[1, 2].forEach((i) => {
			const cell = row.cells[i];
			if (!cell) return;
			const ul = cell.querySelector("ul");
			if (ul) {
				ul.querySelectorAll("li").forEach((li) => {
					li.textContent = li.dataset.searchText ?? "";
				});
				return;
			}
			const target = getHighlightTarget(cell);
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
			distance: 100,
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

			const matches = new Set(fuse.search(query).map((r) => r.item.row));

			rows.forEach((row) => {
				if (matches.has(row)) {
					row.classList.add("active");
					row.classList.remove("hidden");
					applyHighlights(row, query);
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
