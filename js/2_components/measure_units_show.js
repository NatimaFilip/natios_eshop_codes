let singleMeasuringUnit = {};
if (csLang) {
	singleMeasuringUnit = {
		kapslí: "kapsle",
		tablet: "tableta",
		tobolek: "tobolka",
		tabletek: "tabletka",
		dávek: "dávka",
		dávky: "dávka",
		produkty: "produkt",
		produktů: "produkt",
	};
}
if (skLang) {
	singleMeasuringUnit = {
		kapsúl: "kapsula",
		kapsula: "kapsula",
		tabliet: "tableta",
		tablietek: "tabletka",
		dávok: "dávka",
		dávky: "dávka",
		produktov: "produkt",
		produkty: "produkt",
	};
}
if (plLang) {
	singleMeasuringUnit = {
		kapsułek: "kapsułka",
		kapsułki: "kapsułka",
		tabletek: "tableta",
		saszetek: "saszetka",
		pastylek: "pastylka",
		gumisiów: "gumiś",
		dawek: "dawka",
		produktów: "produkt",
		produkty: "produkt",
	};
}

async function measureUnitFromFiltersProducts() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	await downloadAndSaveMeasureUnitFilter();
	let productFilterData = measureFiltersData;
	if (!productFilterData || productFilterData.length === 0) {
		return; // No filter data available
	}

	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("product-edited-measure")) {
			return; // Skip if already processed
		}
		product.classList.add("product-edited-measure");
		let productCodeForFilter = product.querySelector("span[data-micro='sku']")?.textContent.trim();
		if (!productCodeForFilter) {
			console.warn("Product code not found for a product.");
			return;
		}

		let amountText = productFilterData.find((item) => item.code === productCodeForFilter)?.value;
		if (!amountText) {
			console.warn("No measure unit found for product code:", productCodeForFilter);
			return;
		}

		// Convert comma to dot, then extract the number and unit
		let normalizedAmountText = amountText.replace(",", ".").trim();

		// Extract the numeric part (including decimal)
		let productMeasureAmount = normalizedAmountText.match(/[\d.]+/) ? normalizedAmountText.match(/[\d.]+/)[0] : "";

		// Extract the unit part (letters and spaces after the number)
		let productMeasureUnit = normalizedAmountText.replace(/[\d.\s]+/, "").trim();

		/* 	let productMeasureAmount = amountText.replace(/[^\d]/g, ""); //keep only digits from the measure unit
		let productMeasureUnit = amountText.replace(/[\d\s]/g, ""); //keep only letters from the measure unit
 */
		let ratingsWrapper = product.querySelector(".ratings-wrapper");
		if (ratingsWrapper) {
			// Create a new span element to display the amount
			let measureUnitSpan = document.createElement("span");
			measureUnitSpan.className = "product-measure-unit";
			measureUnitSpan.textContent = amountText;

			// Append the amount span to the ratings wrapper
			ratingsWrapper.appendChild(measureUnitSpan);
		}

		const pricePerUnitDiv = document.createElement("div");
		pricePerUnitDiv.className = "product-price-per-unit";
		let prices = product.querySelector(".prices");

		let priceFinal = product.querySelector(".price-final strong");
		let priceFinalValue;

		if (priceFinal) {
			// Extract the text content, trim it, and remove everything but numbers
			priceFinalValue = priceFinal.textContent.trim().replace(/[^\d.,]/g, ""); // Keep only digits, commas, and dots
			priceFinalValue = parseFloat(priceFinalValue.replace(",", ".")).toFixed(2);
		}

		let pricePerUnit_Unit;

		let foundUnitMatch = false;

		// Iterate over the keys in the object
		for (let key in singleMeasuringUnit) {
			if (productMeasureUnit.includes(key)) {
				foundUnitMatch = true;
				pricePerUnit_Unit = singleMeasuringUnit[key];
				break; // Exit the loop once a match is found
			}
		}
		if (!foundUnitMatch) {
			// If no match is found, use the original measure unit
			pricePerUnit_Unit = productMeasureUnit;
		}

		const pricePerUnit_Value = priceFinalValue / productMeasureAmount;

		const pricePerUnit_ValueSpan = document.createElement("span");
		pricePerUnit_ValueSpan.className = "product-price-per-unit-value";

		if (csLang) {
			pricePerUnit_ValueSpan.textContent =
				pricePerUnit_Value.toFixed(2).replace(".", ",") + " Kč / 1 " + pricePerUnit_Unit;
		}
		if (skLang) {
			pricePerUnit_ValueSpan.textContent =
				pricePerUnit_Value.toFixed(2).replace(".", ",") + " € / 1 " + pricePerUnit_Unit;
		}
		if (plLang) {
			pricePerUnit_ValueSpan.textContent =
				pricePerUnit_Value.toFixed(2).replace(".", ",") + " zł / 1 " + pricePerUnit_Unit;
		}

		if (prices && pricePerUnitDiv) {
			prices.appendChild(pricePerUnitDiv);
			pricePerUnitDiv.appendChild(pricePerUnit_ValueSpan);
		}
	});
}

async function measureUnitFromFiltersDetail() {
	let priceAndButtonWrapper = document.querySelector(".price-and-button-wrapper");
	if (!priceAndButtonWrapper) {
		return; // No products found
	}

	let sku = document.querySelector(".p-code > span:nth-child(2)")?.textContent.trim();
	if (!sku) {
		return; // No SKU found
	}
	await downloadAndSaveMeasureUnitFilter();
	let productFilterData = measureFiltersData;
	if (!productFilterData || productFilterData.length === 0) {
		return; // No filter data available
	}

	let amountText = productFilterData.find((item) => item.code === sku)?.value;
	if (!amountText) {
		console.warn("No measure unit found for product code:", productCodeForFilter);
		return;
	}
	// Convert comma to dot, then extract the number and unit
	let normalizedAmountText = amountText.replace(",", ".").trim();

	// Extract the numeric part (including decimal)
	let productMeasureAmount = normalizedAmountText.match(/[\d.]+/) ? normalizedAmountText.match(/[\d.]+/)[0] : "";

	// Extract the unit part (letters and spaces after the number)
	let productMeasureUnit = normalizedAmountText.replace(/[\d.\s]+/, "").trim();

	let priceFinal = priceAndButtonWrapper.querySelector(".price-final");

	let priceFinalHolder = priceAndButtonWrapper.querySelector(".price-final-holder");
	let priceFinalValue;

	if (priceFinalHolder) {
		// Extract the text content, trim it, and remove everything but numbers
		priceFinalValue = priceFinalHolder.textContent.trim().replace(/[^\d.,]/g, ""); // Keep only digits, commas, and dots
		priceFinalValue = parseFloat(priceFinalValue.replace(",", ".")).toFixed(2);
	}

	let pricePerUnit_Unit;

	let foundUnitMatch = false;

	// Iterate over the keys in the object
	for (let key in singleMeasuringUnit) {
		if (productMeasureUnit.includes(key)) {
			foundUnitMatch = true;
			pricePerUnit_Unit = singleMeasuringUnit[key];
			break; // Exit the loop once a match is found
		}
	}
	if (!foundUnitMatch) {
		// If no match is found, use the original measure unit
		pricePerUnit_Unit = productMeasureUnit;
	}

	const pricePerUnit_Value = priceFinalValue / productMeasureAmount;

	const pricePerUnit_ValueSpan = document.createElement("span");
	pricePerUnit_ValueSpan.className = "product-price-per-unit-value";

	if (activeLang === "cs") {
		pricePerUnit_ValueSpan.textContent =
			pricePerUnit_Value.toFixed(2).replace(".", ",") + " Kč / 1 " + pricePerUnit_Unit;
	}
	if (activeLang === "sk") {
		pricePerUnit_ValueSpan.textContent =
			pricePerUnit_Value.toFixed(2).replace(".", ",") + " € / 1 " + pricePerUnit_Unit;
	}
	if (activeLang === "pl") {
		pricePerUnit_ValueSpan.textContent =
			pricePerUnit_Value.toFixed(2).replace(".", ",") + " zł / 1 " + pricePerUnit_Unit;
	}

	const pricePerUnitDiv = document.createElement("div");
	pricePerUnitDiv.className = "product-price-per-unit";
	priceFinal.appendChild(pricePerUnitDiv);
	pricePerUnitDiv.appendChild(pricePerUnit_ValueSpan);
}

let measureFiltersData = [];
measureUnitFromFiltersProducts();
document.addEventListener("ShoptetDOMContentLoaded", function (event) {
	measureUnitFromFiltersProducts();
});
document.addEventListener("luigiSearchDone", function (event) {
	measureUnitFromFiltersProducts();
});

if (body.classList.contains("type-product")) {
	document.addEventListener("priceAndButtonMoved", function (event) {
		measureUnitFromFiltersDetail();
	});
}
