if (body.classList.contains("is-test-eshop")) {
	document.addEventListener(
		"RAVENTIC SEARCH RESULTS LOADED",
		() => {
			editRaventicSearchResults();
		},
		{ once: true },
	);

	document.addEventListener("RAVENTIC SEARCH RESULTS TRANSFORMED", () => {
		addGoToTopButton();
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

		function findExistingTransformed(list) {
			const sibling = list.nextElementSibling;
			if (sibling?.id === "products" && sibling.classList.contains("products-block")) return sibling;
			return null;
		}

		function transformResults() {
			const list = document.querySelector(RV_LIST_SELECTOR);
			if (!list) return;
			const items = list.querySelectorAll(".raventic-product");
			if (!items.length) return;
			if (list.dataset[TRANSFORMED_FLAG] === "true" && findExistingTransformed(list)) return;

			findExistingTransformed(list)?.remove();

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

		document.addEventListener("RAVENTIC SEARCH RESULTS LOADED", () => {
			observer.disconnect();
			const list = document.querySelector(RV_LIST_SELECTOR);
			if (list) {
				findExistingTransformed(list)?.remove();
				delete list.dataset[TRANSFORMED_FLAG];
			}
			observer.observe(document.body, { childList: true, subtree: true });
		});

		transformResults();

		const observer = new MutationObserver(() => {
			const list = document.querySelector(RV_LIST_SELECTOR);
			if (!list) return;
			if (list.dataset[TRANSFORMED_FLAG] === "true") return;
			if (list.querySelector(".raventic-product")) transformResults();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	function addGoToTopButton() {
		console.log("*****1");
		const paginator = document.querySelector(".raventic-search-results-paginator");
		if (!paginator) return;
		console.log("*****2");
		let raventicHeading = document.querySelector(".raventic-search-results-container");
		if (!raventicHeading) {
			return;
		}
		console.log("*****3");
		raventicHeading.id = "productsListHeading";

		const goToTop = document.createElement("div");
		goToTop.className = "goToTop";
		goToTop.innerHTML =
			'<a class="goToTop__button btn btn-secondary" href="#productsListHeading" aria-label="' +
			translationsStrings.nahoru[activeLang] +
			'" data-testid="buttonPageUp">' +
			translationsStrings.nahoru[activeLang] +
			"</a>";
		paginator.prepend(goToTop);
		goTopBtn();
	}
}
