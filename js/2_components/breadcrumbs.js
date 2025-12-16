shortenBreadcrumbs();
function shortenBreadcrumbs() {
	let breadcrumbs = document.querySelector(".breadcrumbs");
	if (!breadcrumbs) {
		return;
	}
	const breadcrumbsSpans = Array.from(breadcrumbs.querySelectorAll("span[itemprop='itemListElement']"));
	if (breadcrumbsSpans.length <= 2) {
		breadcrumbs.classList.add("only-home");
	} else {
		breadcrumbs.classList.add("shortened");
	}
}
