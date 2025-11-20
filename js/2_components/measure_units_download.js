/*NEW MEASURE UNIT - JSON GITHUB*/
async function downloadAndSaveMeasureUnitFilter() {
	const url = translationsStrings.gitFiltersUrl[activeLang];
	const storageKey = "measureFilters";
	const expiryKey = "measureFilters_expiry_01";

	// Check if data is already in localStorage and not expired
	const now = Date.now();
	const expiry = localStorage.getItem(expiryKey);
	const cached = localStorage.getItem(storageKey);
	if (expiry && cached && now < parseInt(expiry)) {
		// Data is still valid
		console.log("Measure filters loaded from localStorage.");
		measureFiltersData = JSON.parse(cached);
		return;
	}

	// Fetch and save
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Network response was not ok");
		const data = await response.json();
		localStorage.setItem(storageKey, JSON.stringify(data));
		localStorage.setItem(expiryKey, (now + 24 * 60 * 60 * 1000).toString());
		console.log("Measure filters saved to localStorage.");
		measureFiltersData = data;
	} catch (error) {
		console.warn("Failed to fetch Measure filters:", error);
	}
}
