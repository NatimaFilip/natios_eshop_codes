if (body.classList.contains("is-test-eshop")) {
	(function (e, t, a, i, n, o, d, ab) {
		if (!location.href.includes("769560.myshoptet.com/vyhledavani")) return;
		console.log("Raventic Search Results script loaded");
		var r;
		if (ab) {
			void 0 === window.dataLayer && (window.dataLayer = []);
			const e = "_rvn_ab",
				t = "0",
				a = "1",
				i =
					null === (r = document.cookie.split("; ").find((t) => t.startsWith(e + "="))) || void 0 === r
						? void 0
						: r.split("=")[1],
				n = i === t || i === a ? i : Math.random() < 0.5 ? t : a;
			if (
				((document.cookie = `${e}=${n}; domain=${location.hostname}; path=/; max-age=31536000; sameSite=Lax`),
				window.dataLayer.push({
					event: "RaventicSearchIntegrationTest",
					raventic: { search: {}, raventic_variant: n, raventic_widget: "search_results" },
				}),
				n === t)
			)
				return;
		}
		let s = !1;
		window.raventicResultsReady = function (r) {
			s || ((s = !0), r(e, t, a, i, n, o, d));
		};
		const c = document.createElement("script");
		/*Temp logging*/
		c.onload = function () {
			const RV = window.RaventicSearchResults;
			console.log("%c RAVENTIC SDK PROBE ", "background:#0af;color:#000;padding:4px 8px;font-weight:bold;");
			console.log("RaventicSearchResults:", RV);
			if (RV) {
				console.log("Static keys:", Object.getOwnPropertyNames(RV));
				console.log("Prototype methods:", Object.getOwnPropertyNames(RV.prototype || {}));
			}
		};
		((c.src = "https://sdk.rvndn.com/semsearch/v3/results.min.js?v=20251112002"), document.head.appendChild(c));
	})(
		"#content",
		{
			locale: "cs-CZ",
			apiKey: "eucbf8ea240ae5a52ce1399a8df2bbd",

			currency: "CZK",
			priceDecimals: 0,

			noResultsFoundMessage: "Nic jsme nenašli, zkuste to znovu",

			queryParameterName: "string",

			pageSize: 20,

			titlePattern: 'Hledáme "{QUERY}"',
			noQueryTitle: "Produkty",

			categoriesTitle: "Kategorie",
			manufacturersTitle: "Výrobce",
			/* showManufacturers: true, */
			showManufacturers: false,
			analyticsEventsTarget: "dataLayer",

			priceTitle: "Cena",

			disableDefaultStyles: true,
			thumbnailDimensions: { width: 400, height: 400 },
			doNotCropImages: false,

			filtersTitle: "Filtry",
			filterButtonTitle: "Zobrazit filtry",
			clearAllFiltersTitle: "Zrušit všechny filtry",
			buttonTypeParameterName: "button-type",
			buttonLabelParameterName: "button-text",
			buttonStyleParameterName: "button-style",

			priceParameterName: "_price",
			salePriceParameterName: "_sale-price",

			individualParameters: [
				{
					parameterName: "SHORT_DESCRIPTION",
					title: "Popis",
				},
				{
					parameterName: "RATING_AVG",
					title: "Hodnocení",
				},
				{
					parameterName: "RATING_TOTAL",
					title: "Počet recenzí",
				},
				{
					parameterName: "IMGURL_ALTERNATIVE",
					title: "Alternativní obrázek",
				},
				{
					parameterName: "STOCK_AMOUNT",
					title: "Skladem",
				},
			],

			customStyles: ``,
			customPageStyles: ``,

			desktopMode: "left",
			cartConfig: {
				type: "NoActionCart",
				label: "DO KOŠÍKU",
			},
		},
		undefined,
		(product, instanceId, action, source) => {
			if (action == "add-to-cart") {
				shoptet.cartShared.addToCart({ productCode: product.id });
			}
		},
		undefined,
		/*undefined,*/
		(result, error, instanceId) => {
			if (error) {
				console.error("Raventic API error:", error);
				return;
			}
			console.log("Raventic API result:", result);
			/*Temp logging*/
			if (result) {
				console.log("API result top-level keys:", Object.keys(result));
				console.log("articles in result?", "articles" in result, result.articles);
				console.log("content in result?", "content" in result, result.content);
				if (result.facets) console.log("facets keys:", Object.keys(result.facets));
			}
			/*Temp logging*/
			if (result && result.products && result.products.length > 0) {
				console.log("First product parameters:", result.products[0].parameters);
				console.table(result.products[0].parameters);
			}
			window.raventicResult = result;

			console.log(
				"%c CUSTOM EVENT DISPATCHED: RAVENTIC SEARCH RESULTS LOADED ",
				"background: lime; color: black; padding: 5px 10px; font-weight: bold;",
			);
			document.dispatchEvent(new CustomEvent("RAVENTIC SEARCH RESULTS LOADED"));
		},
		undefined,
		undefined,
		false,
	);
}
