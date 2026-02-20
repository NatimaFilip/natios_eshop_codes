if (body.classList.contains("id-2502")) {
	let slovnik_pojmu_popis = [
		{
			phrase: "hematoencefalickou membránou",
			synonyms: [],
			explanation:
				"Hematoencefalická membrána je tenká vrstva buněk, která odděluje krevní oběh od mozku a chrání ho před škodlivými látkami. Tato membrána umožňuje průchod živin a kyslíku do mozku, ale zároveň brání vstupu škodlivých látek, jako jsou bakterie a toxiny. Hematoencefalická membrána je klíčová pro udržení zdraví mozku a jeho správné fungování.",
		},
		{
			phrase: "juty",
			synonyms: ["juta", "jutě"],
			explanation:
				"Juta je přírodní vlákno získávané z rostliny zvané jute. Je to silné a odolné vlákno, které se často používá k výrobě pytlů, provazů, koberců a dalších textilních výrobků. Juta je ekologicky šetrná, protože je biologicky rozložitelná a obnovitelná. Díky své pevnosti a trvanlivosti je juta oblíbeným materiálem pro různé průmyslové a domácí aplikace.",
		},
	];
	let description = document.getElementById("description");
	if (description) {
		slovnik_pojmu(description, slovnik_pojmu_popis);
	}

	function slovnik_pojmu(whereToCheck, slovnik) {
		if (!whereToCheck) {
			return;
		}

		// Build a flat lookup: lowercased form -> entry
		const lookup = new Map();
		for (const entry of slovnik) {
			lookup.set(entry.phrase.toLowerCase(), entry);
			for (const syn of entry.synonyms) {
				lookup.set(syn.toLowerCase(), entry);
			}
		}

		// Collect all matchable forms, sort longest first
		const allForms = [...lookup.keys()];
		allForms.sort((a, b) => b.length - a.length);
		const escaped = allForms.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
		const regex = new RegExp(`(?<!\\p{L})(${escaped.join("|")})(?!\\p{L})`, "giu");

		const used = new Set();
		replaceTextInNode(whereToCheck, regex, lookup, used);
	}

	function replaceTextInNode(node, regex, lookup, used) {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent;
			if (!regex.test(text)) {
				regex.lastIndex = 0;
				return;
			}
			regex.lastIndex = 0;

			const fragment = document.createDocumentFragment();
			let lastIndex = 0;
			let match;

			while ((match = regex.exec(text)) !== null) {
				const phrase = match[0];
				const entry = lookup.get(phrase.toLowerCase());

				if (used.has(entry)) {
					fragment.appendChild(document.createTextNode(text.slice(lastIndex, regex.lastIndex)));
					lastIndex = regex.lastIndex;
					continue;
				}

				if (match.index > lastIndex) {
					fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
				}

				used.add(entry);
				const tooltip = document.createElement("span");
				tooltip.className = "slovnik-tooltip";
				tooltip.textContent = phrase;
				tooltip.dataset.tooltip = entry.explanation;
				fragment.appendChild(tooltip);

				lastIndex = regex.lastIndex;
			}

			if (lastIndex < text.length) {
				fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
			}

			node.parentNode.replaceChild(fragment, node);
		} else if (
			node.nodeType === Node.ELEMENT_NODE &&
			!["SCRIPT", "STYLE", "H1", "H2", "H3", "H4"].includes(node.nodeName)
		) {
			// Iterate over a static copy since we may modify children
			Array.from(node.childNodes).forEach((child) => replaceTextInNode(child, regex, lookup, used));
		}
	}
}
