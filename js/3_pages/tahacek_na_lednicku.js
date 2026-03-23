if (body.classList.contains("in-tahacek-na-lednicku")) {
	document.addEventListener("DOMContentLoaded", function () {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/fuse.js@7.1.0";
		document.body.appendChild(script);
		script.onload = init;
	});

	function init() {
		const fuseOptions = {
			isCaseSensitive: false,
			includeScore: false,
			shouldSort: true,
			includeMatches: false,
			findAllMatches: false,
			minMatchCharLength: 2,
			location: 0,
			threshold: 0.2,
			distance: 400,
			useExtendedSearch: false,
			ignoreLocation: true,
			ignoreFieldNorm: false,
			fieldNormWeight: 0.5,
			keys: ["product"],
		};

		const rows = Array.from(document.querySelectorAll("#natios-tahacek tbody tr"));

		const data = rows.map((row) => ({
			product: row.cells[1]?.textContent.trim() ?? "",
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
			});
		});
	}
}
