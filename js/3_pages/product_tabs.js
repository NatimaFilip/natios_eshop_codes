function productNavigationCustom() {
	let detailTabs = document.querySelector("#p-detail-tabs");

	if (!detailTabs) {
		return; // Exit if detail tabs are not found
	}
	let shpTabs = document.querySelectorAll(".shp-tab");
	if (shpTabs && shpTabs.length > 0) {
		shpTabs.forEach((tab) => {
			tab.remove();
		});
	}

	createTabForSection("#description", translationsStrings.descriptionTitle[activeLang], true, detailTabs);

	createTabForSection(
		".product-widget[widget-type='directions']",
		translationsStrings.directionsTitle[activeLang],
		false,
		detailTabs
	);

	createTabForSection(
		".product-widget[widget-type='ingredients']",
		translationsStrings.ingredientsTitle[activeLang],
		false,
		detailTabs
	);
	createTabForSection("table.ingredients", translationsStrings.ingredientsTitle[activeLang], true, detailTabs);

	createTabForSection(".natios-analysis", translationsStrings.certificatesTitle[activeLang], true, detailTabs);
	createTabForSection("#ratingTab", translationsStrings.reviewsTitle[activeLang], false, detailTabs);
	createTabForSection(".natios-support-wrapper", translationsStrings.weSupportTitle[activeLang], false, detailTabs);
	createTabForSection(".products-related", translationsStrings.relatedProductsTitle[activeLang], false, detailTabs);

	function createTabForSection(sectionId, tabTitle, isHardcoded, detailTabs) {
		const section = document.querySelector(sectionId);
		if (!section) {
			console.warn(`Section with ID ${sectionId} not found.`);
			return;
		}

		const tab = document.createElement("li");
		tab.className = "shp-tab";

		let tabTitleText = tabTitle;

		if (!isHardcoded) {
			tabTitleText = section.querySelector("h2")
				? section.querySelector("h2").textContent.trim()
				: section.querySelector("h3")
				? section.querySelector("h3").textContent.trim()
				: section.querySelector("h4")
				? section.querySelector("h4").textContent.trim()
				: tabTitle;
		}

		tab.innerHTML = `<span class="shp-tab-link" data-tab="${sectionId}">${tabTitleText}</span>`;

		if (sectionId === "#ratingTab") {
			try {
				let numberOfReviews = section.querySelector(".stars-label").textContent.trim().match(/^\d+/)?.[0];
				tab.innerHTML = `<span class="shp-tab-link" data-tab="${sectionId}">${tabTitleText}<span class="number-of-reviews">${numberOfReviews}</span></span>`;
			} catch (error) {
				console.warn("Error parsing number of reviews:", error);
			}
		}
		detailTabs.appendChild(tab);

		tab.addEventListener("click", function () {
			const activeShopTab = document.querySelector(".shp-tab.active");
			if (activeShopTab && activeShopTab !== tab) {
				activeShopTab.classList.remove("active");
			}
			scrollToElement(section);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const activeShopTab = document.querySelector(".shp-tab.active");
						if (activeShopTab) {
							activeShopTab.classList.remove("active");
						}
						tab.classList.add("active");
					}
				});
			},
			{ root: null, threshold: 0.01 } // Trigger when 1% of the section is visible
		);
		observer.observe(section);
	}
}

function productThumbnailInNavigation() {
	let navigaceProduktu = document.querySelector(".shp-tabs-row");
	let productMainImage = document.querySelector(".p-image-wrapper .p-main-image");
	let productName = document.querySelector("h1");
	let productPrice = document.querySelector(".product-top .price-final-holder");

	if (!navigaceProduktu || !productMainImage || !productName || !productPrice) {
		console.warn("Product main image, name, or price not found.");
		return; // Exit if any of the elements are not found
	}

	const shopTapRowWrapper = document.createElement("div");
	shopTapRowWrapper.className = "shop-tap-row-wrapper";
	navigaceProduktu.parentNode.insertBefore(shopTapRowWrapper, navigaceProduktu);
	shopTapRowWrapper.appendChild(navigaceProduktu);

	const productThumbnailButton = document.createElement("div");

	let isAvailableProduct = false;
	if (document.querySelector(".product-top .add-to-cart-button")) {
		isAvailableProduct = true;
	}
	if (isAvailableProduct) {
		productThumbnailButton.className = "product-thumbnail-add-to-cart-button";
		productThumbnailButton.textContent = translationsStrings.toCart[activeLang];
	}

	if (!isAvailableProduct) {
		productThumbnailButton.className = "product-thumbnail-notice-me-button";
		productThumbnailButton.textContent = translationsStrings.alertMe[activeLang];
	}

	const productThumbnail = document.createElement("div");
	productThumbnail.className = "product-thumbnail";

	productThumbnail.innerHTML = `
			<div class="product-thumbnail-image-wrapper">
				${productMainImage.innerHTML}
			</div>
			<div class="product-thumbnail-info-wrapper">
				<div class="product-thumbnail-name">
					${productName.innerHTML}
				</div>
				<div class="product-thumbnail-price-button-wrapper">
					<div class="product-thumbnail-price">
						${productPrice.innerHTML}
						</div>
					<div class="product-thumbnail-buttons">
						${productThumbnailButton.outerHTML}
					</div>
				</div>
			</div>
		`;

	navigaceProduktu.prepend(productThumbnail);
	if (isAvailableProduct) {
		document.querySelector(".product-thumbnail-add-to-cart-button").addEventListener("click", function () {
			shoptet.cartShared.addToCart({ productCode: productCodeValue });
		});
	}
	if (!isAvailableProduct) {
		let watchdog = document.querySelector(".product-top .watchdog");
		if (watchdog) {
			document.querySelector(".product-thumbnail-notice-me-button").addEventListener("click", function () {
				watchdog.click();
			});
		}
	}
}

if (body.classList.contains("type-product")) {
	document.addEventListener("DOMContentLoaded", function () {
		productNavigationCustom();
		productThumbnailInNavigation();
	});
}
