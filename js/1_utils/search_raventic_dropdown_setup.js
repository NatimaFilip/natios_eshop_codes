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

			disableDefaultStyles: true,
			customStyles: ``,
			customPageStyles: ``,

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
				/* 	{
					parameterName: "IMGURL_ALTERNATIVE",
					title: "Alternativní obrázek",
				}, */
				{
					parameterName: "STOCK_AMOUNT",
					title: "Skladem",
				},
			],

			showAllMessage: "ZOBRAZIT VŠECHNY PRODUKTY",

			content: [
				{
					type: "categories",
					title: "Kategorie",
				},
				/* 	{
					type: "brands",
					title: "Značky",
				}, */
				{
					type: "articles",
					title: "Články",
				},
			],
		},
		undefined, // on open handler        (3rd)
		(product, instanceId, action, source) => {
			// on click handler (4th)
			if (action == "add-to-cart") {
				shoptet.cartShared.addToCart({ productCode: product.id });
			}
		},
		undefined, // error handler           (5th)
		/* undefined, */
		(result, error, instanceId) => {
			// API result handler (6th) <-- HERE
			if (result && !error) {
				console.log(
					"%c CUSTOM EVENT DISPATCHED: RAVENTIC SEARCH RESULTS DROPDOWN LOADED ",
					"background: lime; color: black; padding: 5px 10px; font-weight: bold;",
				);
				document.dispatchEvent(new CustomEvent("RAVENTIC SEARCH RESULTS DROPDOWN LOADED"));
			}
		},
		undefined, // events handler          (7th)
		undefined, // on close handler        (8th)
		false, // ab testing              (9th)
	);
}

document.addEventListener("RAVENTIC SEARCH RESULTS DROPDOWN LOADED", () => {
	moveSuggestedPhraseToSidebar();
	editProductRelustsLayout();
});

function moveSuggestedPhraseToSidebar() {
	const raventicSidebar = document.querySelector(".raventic-search-dropdown-body-sidebar");
	if (!raventicSidebar) return;

	const suggestedPhraseElement = document.querySelector(".raventic-search-dropdown-body-products-query");
	if (!suggestedPhraseElement) return;

	raventicSidebar.prepend(suggestedPhraseElement);
}

function editProductRelustsLayout() {
	document.querySelectorAll(".raventic-product").forEach((product) => {
		const ratingAvgEl = product.querySelector('[data-raventic-parameter="rating_avg"]');
		const ratingTotalEl = product.querySelector('[data-raventic-parameter="rating_total"]');

		if (ratingAvgEl && ratingTotalEl) {
			const ratingValue = parseFloat(
				ratingAvgEl.querySelector("[data-raventic-parameter-value]")?.getAttribute("data-raventic-parameter-value") ||
					"0",
			);
			const ratingCount = parseInt(
				ratingTotalEl.querySelector("[data-raventic-parameter-value]")?.getAttribute("data-raventic-parameter-value") ||
					"0",
			);
			const roundedRating = Math.round(ratingValue);

			const starsHtml = Array.from(
				{ length: 5 },
				(_, i) => `<span class="star ${i < roundedRating ? "star-on" : "star-off"}" aria-hidden="true"></span>`,
			).join("");

			const starsWrapper = document.createElement("div");
			starsWrapper.className = "stars-wrapper";
			starsWrapper.setAttribute("data-micro-rating-value", roundedRating.toString());
			starsWrapper.setAttribute("data-micro-rating-count", ratingCount.toString());
			starsWrapper.innerHTML = `<span class="stars star-list">${starsHtml}<span class="sr-only">Průměrné hodnocení produktu je ${ratingValue.toFixed(1).replace(".", ",")} z 5 hvězdiček.</span></span><span class="reviews-number">${ratingCount}x</span>`;

			ratingAvgEl.replaceWith(starsWrapper);
			ratingTotalEl.remove();
		}

		const stockEl = product.querySelector('[data-raventic-parameter="stock_amount"]');
		if (stockEl) {
			const stockValue = parseInt(
				stockEl.querySelector("[data-raventic-parameter-value]")?.getAttribute("data-raventic-parameter-value") || "0",
			);

			const availabilityEl = document.createElement("div");
			availabilityEl.className = "availability";

			if (stockValue > 0) {
				const amountText = stockValue >= 10 ? `>10 ks` : `${stockValue} ks`;
				availabilityEl.innerHTML = `<span style="color:#009901">Skladem</span><span class="availability-amount" data-testid="numberAvailabilityAmount">(${amountText})</span>`;
			} else {
				availabilityEl.innerHTML = `<span style="color:#cc0000">Nedostupné</span>`;
			}

			stockEl.replaceWith(availabilityEl);
		}
	});
}
