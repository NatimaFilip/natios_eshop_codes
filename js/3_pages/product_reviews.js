function productReviews() {
	let ratingTab = document.querySelector("#ratingTab");
	let rateForm = document.querySelector("#rate-form");
	let rateWrap = document.querySelector("#ratingTab .rate-wrap");

	if (!ratingTab || !rateForm || !rateWrap) return;

	rateWrap.appendChild(rateForm);

	let rateAverageWrap = ratingTab.querySelector(".rate-average-wrap");
	if (rateAverageWrap) {
		const ratingHeader = document.createElement("h3");
		ratingHeader.classList.add("rating-header");
		ratingHeader.textContent = translationsStrings.reviewsTitle[activeLang];
		rateAverageWrap.prepend(ratingHeader);
	}
}

if (body.classList.contains("type-product")) {
	productReviews();
}
