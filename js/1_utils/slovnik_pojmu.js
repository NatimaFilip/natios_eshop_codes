if (body.classList.contains("admin-logged")) {
	let slovnik_pojmu_popis = {
		"hematoencefalickou membránou":
			"Hematoencefalická membrána je tenká vrstva buněk, která odděluje krevní oběh od mozku a chrání ho před škodlivými látkami. Tato membrána umožňuje průchod živin a kyslíku do mozku, ale zároveň brání vstupu škodlivých látek, jako jsou bakterie a toxiny. Hematoencefalická membrána je klíčová pro udržení zdraví mozku a jeho správné fungování.",
		juta: "Juta je přírodní vlákno získávané z rostliny zvané jute. Je to silné a odolné vlákno, které se často používá k výrobě pytlů, provazů, koberců a dalších textilních výrobků. Juta je ekologicky šetrná, protože je biologicky rozložitelná a obnovitelná. Díky své pevnosti a trvanlivosti je juta oblíbeným materiálem pro různé průmyslové a domácí aplikace.",
	};
	let description = document.getElementById("description");
	if (description) {
		slovnik_pojmu(description, slovnik_pojmu_popis);
	}

	function slovnik_pojmu(whereToCheck, slovnik) {
		if (!whereToCheck) {
			return;
		}

		const phrases = Object.keys(slovnik);

		// Build a regex that matches any phrase (longest first to avoid partial matches)
		phrases.sort((a, b) => b.length - a.length);
		const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
		const regex = new RegExp(`(${escaped.join("|")})`, "gi");

		replaceTextInNode(whereToCheck, regex, slovnik);
	}

	function replaceTextInNode(node, regex, slovnik) {
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
				if (match.index > lastIndex) {
					fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
				}

				const phrase = match[0];
				const key = Object.keys(slovnik).find((k) => k.toLowerCase() === phrase.toLowerCase());
				const tooltip = document.createElement("span");
				tooltip.className = "slovnik-tooltip";
				tooltip.textContent = phrase;
				tooltip.dataset.tooltip = slovnik[key];
				fragment.appendChild(tooltip);

				lastIndex = regex.lastIndex;
			}

			if (lastIndex < text.length) {
				fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
			}

			node.parentNode.replaceChild(fragment, node);
		} else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
			// Iterate over a static copy since we may modify children
			Array.from(node.childNodes).forEach((child) => replaceTextInNode(child, regex, slovnik));
		}
	}
}
