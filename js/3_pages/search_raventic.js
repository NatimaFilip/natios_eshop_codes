if (body.classList.contains("is-test-eshop")) {
	document.addEventListener("RAVENTIC SEARCH RESULTS LOADED", () => {
		editRaventicSearchResults();
		editRaventicFilters();
	});

	function editRaventicSearchResults() {
		const RV_LIST_SELECTOR = ".raventic-search-results-products-list";
		const TRANSFORMED_FLAG = "shoptetTransformed";

		function escapeHtml(s) {
			return String(s).replace(
				/[&<>"']/g,
				(c) =>
					({
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						'"': "&quot;",
						"'": "&#39;",
					})[c],
			);
		}

		function getParamValue(product, name) {
			const el = product.querySelector(`[data-raventic-parameter="${name}"] [data-raventic-parameter-value]`);
			return el ? el.getAttribute("data-raventic-parameter-value") : null;
		}

		function getParamText(product, name) {
			const wrap = product.querySelector(`[data-raventic-parameter="${name}"]`);
			if (!wrap) return null;
			const inner = wrap.querySelector("span[title] span[title]") || wrap.querySelector("span[title]");
			return inner ? inner.textContent.trim() : null;
		}

		function buildStars(avg) {
			const v = parseFloat(avg);
			if (isNaN(v)) return "";
			const rounded = Math.round(v * 2) / 2;
			let html = '<span class="stars star-list">';
			for (let i = 1; i <= 5; i++) {
				if (rounded >= i) html += '<span class="star star-on"></span>';
				else if (rounded >= i - 0.5) html += '<span class="star star-half"></span>';
				else html += '<span class="star"></span>';
			}
			return html + "</span>";
		}

		function relativizeHref(href) {
			if (!href) return "#";
			return href.replace(/^https?:\/\/[^/]+/, "") || "#";
		}

		function findProductByHref(href) {
			const products = window.raventicResult?.products;
			if (!Array.isArray(products)) return null;
			const target = relativizeHref(href).replace(/\/$/, "");
			return (
				products.find((p) => {
					if (!p?.url) return false;
					const candidate = relativizeHref(p.url).replace(/\/$/, "");
					return candidate === target;
				}) || null
			);
		}

		function buildProductCard(rvProduct) {
			const href = relativizeHref(rvProduct.getAttribute("href"));
			const apiProduct = findProductByHref(href);
			const productId = apiProduct?.id || "";
			const name = (rvProduct.querySelector(".raventic-product-name")?.textContent || "").trim();
			const imgEl = rvProduct.querySelector(".raventic-product-image img");
			const imgSrc = imgEl?.getAttribute("src") || "";
			const imgAlt = imgEl?.getAttribute("alt") || name;
			const altImg = getParamValue(rvProduct, "imgurl_alternative");
			const ratingAvg = getParamValue(rvProduct, "rating_avg");
			const ratingTotal = getParamValue(rvProduct, "rating_total");
			const stockAmount = getParamValue(rvProduct, "stock_amount");
			const description = getParamText(rvProduct, "short_description");
			const price = (rvProduct.querySelector(".raventic-product-price-value")?.textContent || "").trim();
			const cartBtn = rvProduct.querySelector(".raventic-product-button-cart");

			const parts = [];
			parts.push('<div class="p swap-images" data-testid="productItem">');

			parts.push(`<a href="${escapeHtml(href)}" class="image">`);
			if (imgSrc) {
				const next = altImg ? ` data-next="${escapeHtml(altImg)}"` : "";
				parts.push(
					`<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(imgAlt)}" class="swap-image"${next} width="423" height="423" loading="lazy">`,
				);
			}
			parts.push("</a>");

			parts.push('<div class="p-in"><div class="p-in-in">');

			if (name) {
				parts.push(
					`<a href="${escapeHtml(href)}" class="name"><span data-testid="productCardName">${escapeHtml(name)}</span></a>`,
				);
			}

			const hasRating = ratingAvg != null;
			const hasStock = stockAmount != null;
			if (hasRating || hasStock) {
				parts.push('<div class="ratings-wrapper">');
				if (hasRating) {
					const cnt = ratingTotal != null ? ` data-micro-rating-count="${escapeHtml(ratingTotal)}"` : "";
					parts.push(
						`<div class="stars-wrapper" data-micro-rating-value="${escapeHtml(ratingAvg)}"${cnt}>${buildStars(ratingAvg)}</div>`,
					);
				}
				if (hasStock) {
					const n = parseInt(stockAmount, 10);
					const stockText = isNaN(n) ? escapeHtml(stockAmount) : n >= 10 ? "(&gt;10&nbsp;ks)" : `(${n}&nbsp;ks)`;
					parts.push(
						`<div class="availability"><span style="color:#009901">Skladem</span> <span class="availability-amount" data-testid="numberAvailabilityAmount">${stockText}</span></div>`,
					);
				}
				parts.push("</div>");
			}

			parts.push("</div>");

			parts.push('<div class="p-bottom single-button"><div>');

			if (price) {
				parts.push(
					`<div class="prices"><div class="price price-final" data-testid="productCardPrice"><strong>${escapeHtml(price)}</strong></div></div>`,
				);
			}

			if (cartBtn) {
				parts.push(
					`<div class="p-tools"><button type="button" class="btn btn-cart add-to-cart-button raventic-add-to-cart-button" data-testid="buttonAddToCart" aria-label="Do košíku ${escapeHtml(name)}"><span>Do košíku</span></button></div>`,
				);
			}

			if (description) {
				parts.push(`<p class="p-desc" data-testid="productCardShortDescr">${escapeHtml(description)}</p>`);
			}

			parts.push("</div></div>");
			parts.push("</div>");

			if (productId) {
				parts.push(`<span class="p-code">Kód: <span data-micro="sku">${escapeHtml(productId)}</span></span>`);
			}

			parts.push("</div>");

			const wrapper = document.createElement("div");
			wrapper.className = "product";
			wrapper.innerHTML = parts.join("");

			if (cartBtn) {
				const newBtn = wrapper.querySelector(".add-to-cart-button");
				newBtn?.addEventListener("click", (e) => {
					e.preventDefault();
					cartBtn.click();
				});
			}

			return wrapper;
		}

		function transformResults() {
			const list = document.querySelector(RV_LIST_SELECTOR);
			if (!list || list.dataset[TRANSFORMED_FLAG] === "true") return;
			const items = list.querySelectorAll(".raventic-product");
			if (!items.length) return;

			const container = document.createElement("div");
			container.id = "products";
			container.className = "products products-page products-block";
			container.setAttribute("data-testid", "productCards");

			items.forEach((rv) => container.appendChild(buildProductCard(rv)));

			list.style.display = "none";
			list.dataset[TRANSFORMED_FLAG] = "true";
			list.parentNode.insertBefore(container, list.nextSibling);

			console.log(
				"%c CUSTOM EVENT DISPATCHED: RAVENTIC SEARCH RESULTS TRANSFORMED ",
				"background: lime; color: black; padding: 5px 10px; font-weight: bold;",
			);
			document.dispatchEvent(new CustomEvent("RAVENTIC SEARCH RESULTS TRANSFORMED"));
		}

		transformResults();

		const observer = new MutationObserver(() => {
			const list = document.querySelector(RV_LIST_SELECTOR);
			if (!list) return;
			if (list.dataset[TRANSFORMED_FLAG] === "true") return;
			if (list.querySelector(".raventic-product")) transformResults();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	function editRaventicFilters() {
		const RV_FILTERS_SELECTOR = ".raventic-search-results-filters";
		const FILTERS_FLAG = "shoptetFiltersTransformed";

		function escapeHtml(s) {
			return String(s).replace(
				/[&<>"']/g,
				(c) =>
					({
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						'"': "&quot;",
						"'": "&#39;",
					})[c],
			);
		}

		function buildEnumSection(rvFilter, idx) {
			const title = rvFilter.querySelector(":scope > h3 > span")?.textContent.trim() || "";
			const items = rvFilter.querySelectorAll(".raventic-search-results-filters-filter-enum-item");
			if (!items.length) return null;

			const isManufacturer = /v[ýy]robce/i.test(title);
			const isCategories = rvFilter.classList.contains("raventic-search-results-filters-filter-categories");

			const sectionClasses = ["filter-section"];
			let sectionId = "";
			if (isManufacturer) {
				sectionClasses.push("filter-section-manufacturer");
				sectionId = "manufacturer-filter";
			} else {
				sectionClasses.push("filter-section-parametric", `filter-section-parametric-id-${idx}`);
			}

			const checkboxes = [];
			const itemsHtml = Array.from(items)
				.map((item, i) => {
					const itemTitle = (item.querySelector("span")?.textContent || item.getAttribute("title") || "").trim();
					if (!itemTitle) return "";
					const itemUrl = item.getAttribute("href") || "#";
					const checked =
						item.getAttribute("aria-checked") === "true" ||
						item.classList.contains("raventic-search-results-filters-filter-enum-item-checked");
					const id = `rvFilter-${idx}-${i}`;
					checkboxes.push({ id, itemUrl });
					return `<div><input type="checkbox" name="rvFilter[]" id="${escapeHtml(id)}" value="${escapeHtml(itemTitle)}" data-url="${escapeHtml(itemUrl)}"${checked ? " checked" : ""} autocomplete="off"><label for="${escapeHtml(id)}" class="filter-label${checked ? " checked" : ""}">${escapeHtml(itemTitle)}</label></div>`;
				})
				.filter(Boolean)
				.join("");

			if (!itemsHtml) return null;

			const idAttr = sectionId ? ` id="${sectionId}"` : "";
			const html = `<div${idAttr} class="${sectionClasses.join(" ")}"><h4><span>${escapeHtml(title)}</span></h4><form method="post"><fieldset>${itemsHtml}</fieldset></form></div>`;

			return { html, checkboxes };
		}

		function buildPriceSection(rvFilter) {
			const title = rvFilter.querySelector(":scope > h3 > span")?.textContent.trim() || "Cena";
			const inputs = rvFilter.querySelectorAll(".raventic-search-results-filters-filter-price-selector input");
			if (inputs.length < 2) return null;

			const minVal = inputs[0]?.value || "";
			const maxVal = inputs[1]?.value || "";
			const minPlaceholder = inputs[0]?.getAttribute("placeholder") || "";
			const maxPlaceholder = inputs[1]?.getAttribute("placeholder") || "";

			const html = `<div class="filter-section filter-section-price"><h4><span>${escapeHtml(title)}</span></h4><div class="price-range"><input type="text" class="price-input price-input-min" id="rv-price-min" value="${escapeHtml(minVal)}" placeholder="${escapeHtml(minPlaceholder)}" autocomplete="off"><span> - </span><input type="text" class="price-input price-input-max" id="rv-price-max" value="${escapeHtml(maxVal)}" placeholder="${escapeHtml(maxPlaceholder)}" autocomplete="off"></div></div>`;

			return { html, inputs };
		}

		function transformFilters() {
			const rvFilters = document.querySelector(RV_FILTERS_SELECTOR);
			if (!rvFilters || rvFilters.dataset[FILTERS_FLAG] === "true") return;

			const desktop = rvFilters.querySelector(".raventic-search-results-filters-desktop");
			if (!desktop) return;

			const filterEls = desktop.querySelectorAll(":scope > .raventic-search-results-filters-filter");
			if (!filterEls.length) return;

			let priceSection = "";
			let priceInputsRef = null;
			const sections = [];
			const checkboxBindings = [];

			filterEls.forEach((rvFilter, idx) => {
				const isPrice = rvFilter.classList.contains("raventic-search-results-filters-filter-price");
				const isEnum = rvFilter.classList.contains("raventic-search-results-filters-filter-enum");

				if (isPrice) {
					const result = buildPriceSection(rvFilter);
					if (result) {
						priceSection = result.html;
						priceInputsRef = result.inputs;
					}
				} else if (isEnum) {
					const result = buildEnumSection(rvFilter, idx);
					if (result) {
						sections.push(result.html);
						result.checkboxes.forEach((cb) => checkboxBindings.push(cb));
					}
				}
			});

			if (!priceSection && !sections.length) return;

			const sectionsHtml = sections.length ? `<div id="category-filter-hover">${sections.join("")}</div>` : "";

			const aside = document.createElement("aside");
			aside.className = "sidebar sidebar-left";
			aside.setAttribute("data-testid", "sidebarMenu");
			aside.innerHTML = `<h2 class="sidebar__heading sr-only">Postranní panel</h2><div class="sidebar-inner sidebar-filters-wrapper"><div class="box box-bg-variant box-sm box-filters"><div id="filters-default-position" data-filters-default-position="left"></div><div class="filters-wrapper"><div class="filters-unveil-button-wrapper" data-testid="buttonOpenFilter"><a href="#" class="btn btn-default unveil-button" data-unveil="filters" data-text="Zavřít filtr">Otevřít filtr</a></div><div id="filters" class="filters"><div class="filter-sections">${priceSection}<div class="filter-section filter-section-button"><a href="#" class="chevron-after chevron-down-after toggle-filters" data-unveil="category-filter-hover">Rozbalit filtr</a></div>${sectionsHtml}</div></div></div></div></div>`;

			checkboxBindings.forEach(({ id, itemUrl }) => {
				const cb = aside.querySelector(`#${CSS.escape(id)}`);
				if (!cb || !itemUrl || itemUrl === "#") return;
				cb.addEventListener("click", () => {
					window.location.href = itemUrl;
				});
			});

			if (priceInputsRef && priceInputsRef.length >= 2) {
				const newMin = aside.querySelector("#rv-price-min");
				const newMax = aside.querySelector("#rv-price-max");
				const forward = (newEl, rvEl) => {
					if (!newEl || !rvEl) return;
					const relay = (eventType) => {
						rvEl.value = newEl.value;
						rvEl.dispatchEvent(new Event(eventType, { bubbles: true }));
					};
					newEl.addEventListener("input", () => relay("input"));
					newEl.addEventListener("change", () => relay("change"));
					newEl.addEventListener("blur", () => relay("blur"));
					newEl.addEventListener("keydown", (e) => {
						if (e.key === "Enter") {
							rvEl.value = newEl.value;
							rvEl.dispatchEvent(
								new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true }),
							);
						}
					});
				};
				forward(newMin, priceInputsRef[0]);
				forward(newMax, priceInputsRef[1]);
			}

			rvFilters.style.display = "none";
			rvFilters.dataset[FILTERS_FLAG] = "true";
			rvFilters.parentNode.insertBefore(aside, rvFilters);

			console.log(
				"%c CUSTOM EVENT DISPATCHED: RAVENTIC SEARCH FILTERS TRANSFORMED ",
				"background: lime; color: black; padding: 5px 10px; font-weight: bold;",
			);
			document.dispatchEvent(new CustomEvent("RAVENTIC SEARCH FILTERS TRANSFORMED"));
		}

		transformFilters();

		const observer = new MutationObserver(() => {
			const rvFilters = document.querySelector(RV_FILTERS_SELECTOR);
			if (!rvFilters) return;
			if (rvFilters.dataset[FILTERS_FLAG] === "true") return;
			if (rvFilters.querySelector(".raventic-search-results-filters-filter")) transformFilters();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}
}
