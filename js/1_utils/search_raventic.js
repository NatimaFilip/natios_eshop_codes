if (body.classList.contains("is-test-eshop")) {
	(function (t, e, o, n, a, c, r, i, d, ab) {
		var s;
		if (ab) {
			void 0 === window.dataLayer && (window.dataLayer = []);
			const t = "_rvn_ab",
				e = "0",
				o = "1",
				n =
					null === (s = document.cookie.split("; ").find((e) => e.startsWith(t + "="))) || void 0 === s
						? void 0
						: s.split("=")[1],
				a = n === e || n === o ? n : Math.random() < 0.5 ? e : o;
			if (
				((document.cookie = ""
					.concat(t, "=")
					.concat(a, "; domain=")
					.concat(location.hostname, "; path=/; max-age=")
					.concat(365 * 86400, "; sameSite=Lax")),
				window.dataLayer.push({
					event: "RaventicSearchIntegrationTest",
					raventic: { search: {}, raventic_variant: a, raventic_widget: "search_dropdown" },
				}),
				a === e)
			)
				return;
		}
		const u = { mousedown: !0, mouseup: !1, click: !1, touchstart: !0, touchend: !1 },
			v = { click: !0 },
			m = (t) => {
				(t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation());
			},
			p = new Set(),
			f = new Map(),
			l = (t, e) => {
				const o = e instanceof HTMLInputElement ? e : null,
					n = (e) => {
						(m(e), p.add(t));
					};
				f.set(t, () => {
					for (const [t, a] of Object.entries(o ? u : v)) e.removeEventListener(t, a ? n : m, !0);
				});
				for (const [t, a] of Object.entries(o ? u : v)) e.addEventListener(t, a ? n : m, !0);
			};
		let h = !1;
		const w = Array.isArray(t) ? t : [t];
		for (const t of w) {
			const e = document.querySelector(t);
			e
				? l(t, e)
				: document.addEventListener("DOMContentLoaded", () => {
						if (h) return;
						const e = document.querySelector(t);
						e && l(t, e);
					});
		}
		window.raventicDropDownReady = function (t) {
			if (h) return;
			for (const [, t] of f) t();
			h = !0;
			const s = t(w, e, o, n, a, c, r, i, d);
			for (let t = 0; t < s.length; t++) {
				const e = s[t];
				p.has(w[t]) && e.open();
			}
		};
		const L = document.createElement("script");
		((L.defer = !0),
			(L.src = "https://sdk.rvndn.com/semsearch/v3/dropdown.min.js?v=20251208001"),
			document.head.appendChild(L));
	})(
		["#formSearchForm input[type='search']"],
		{
			locale: "cs-CZ",
			apiKey: "eucbf8ea240ae5a52ce1399a8df2bbd",
			bestsellersApiKey: "eucbf8ea240ae5a52ce1399a8df2bbd",
			currency: "CZK",
			priceDecimals: 0,

			welcomeMessage: "Najděte přesně to, co hledáte!",
			recommendedProductsTitle: "Oblíbené produkty",
			foundProductsTitle: "Produkty",
			foundProductsTitleShort: "Produkty",
			noResultsFoundMessage: "Nic jsme nenašli, zkuste to znovu",
			searchingForMessage: "Hledáme frázi",
			wouldYouLikeToSearchForMessage: "chcete raději hledat",
			analyticsEventsTarget: "dataLayer",
			zIndex: 1004,

			queryParameterName: "string",
			buttonTypeParameterName: "button-type",
			buttonLabelParameterName: "button-text",
			buttonStyleParameterName: "button-style",
			cartConfig: {
				type: "NoActionCart",
				label: "DO KOŠÍKU",
			},

			submitUrl: "https://769560.myshoptet.com/vyhledavani/",

			customStyles: ``,
			customPageStyles: ``,
			showAllMessage: "ZOBRAZIT VŠECHNY VÝSLEDKY",

			content: [
				{
					type: "categories",
					title: "Kategorie",
				},
				{
					type: "brands",
					title: "Značky",
				},
				{
					type: "articles",
					title: "Články",
				},
			],
		},
		undefined,
		(product, instanceId, action, source) => {
			if (action == "add-to-cart") {
				shoptet.cartShared.addToCart({ productCode: product.id });
			}
		},
		undefined,
		undefined,
		undefined,
		undefined,
		false,
	);
}

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
			showManufacturers: true,
			analyticsEventsTarget: "dataLayer",

			priceTitle: "Cena",

			filtersTitle: "Filtry",
			filterButtonTitle: "Zobrazit filtry",
			clearAllFiltersTitle: "Zrušit všechny filtry",
			buttonTypeParameterName: "button-type",
			buttonLabelParameterName: "button-text",
			buttonStyleParameterName: "button-style",

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
			if (result && result.products && result.products.length > 0) {
				console.log("First product parameters:", result.products[0].parameters);
				console.table(result.products[0].parameters);
			}
		},
		undefined,
		undefined,
		false,
	);
}
