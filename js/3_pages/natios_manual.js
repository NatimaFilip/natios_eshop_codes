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

	function init() {
		const fuseOptions = {
			isCaseSensitive: false,
			includeScore: false,
			shouldSort: true,
			includeMatches: false,
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
			product: row.cells[1]?.textContent.trim() ?? "",
			indication: row.cells[2]?.textContent.trim() ?? "",
			row,
		}));

		const fuse = new Fuse(data, fuseOptions);

		document.getElementById("fuse-input").addEventListener("input", function () {
			const query = this.value.trim();

			if (!query) {
				rows.forEach((row) => {
					row.classList.remove("hidden", "active");
				});
				return;
			}

			const matches = new Set(fuse.search(query).map((r) => r.item.row));

			rows.forEach((row) => {
				if (matches.has(row)) {
					row.classList.add("active");
					row.classList.remove("hidden");
				} else {
					row.classList.add("hidden");
					row.classList.remove("active");
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
