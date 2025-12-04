function moveFooterBanners() {
	if (!body.classList.contains("in-index")) {
		return;
	}
	let footerBanners = document.querySelector(".footer-banners");
	if (!footerBanners) return;

	let homepageGroupTitles = document.querySelectorAll(".homepage-group-title");
	if (!homepageGroupTitles || homepageGroupTitles.length < 3) return;

	// insert footer banners before the 3rd homepage group title
	homepageGroupTitles[2].parentNode.insertBefore(footerBanners, homepageGroupTitles[2]);
}

moveFooterBanners();
