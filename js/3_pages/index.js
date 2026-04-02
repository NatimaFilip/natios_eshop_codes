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

/* moveFooterBanners(); */

if (body.classList.contains("is-test-eshop")) {
	function wrapBlogsInWrapper() {
		if (!body.classList.contains("in-index")) {
			return;
		}

		let homepageBlogWrapper = document.querySelector(".homepage-blog-wrapper");
		if (!homepageBlogWrapper) return;

		let newsItems = document.querySelectorAll(".news-item");
		if (!newsItems || newsItems.length === 0) return;

		let homepageBlogContainer = document.createElement("div");
		homepageBlogContainer.className = "homepage-blog-container";

		// insert before 1st news item
		/* 		let firstNewsItem = newsItems[0];
		firstNewsItem.parentNode.insertBefore(homepageBlogWrapper, firstNewsItem); */

		newsItems.forEach((item) => {
			homepageBlogContainer.appendChild(item);
		});
		homepageBlogWrapper.appendChild(homepageBlogContainer);

		let footerBanners = document.querySelector(".footer-banners");
		if (footerBanners) {
			//insert homepage blog wrapper after footer banners
			footerBanners.parentNode.insertBefore(homepageBlogWrapper, footerBanners.nextSibling);
		}

		inicializeSliderElement(homepageBlogWrapper, homepageBlogContainer, newsItems, "blog-slider", "img");
		homepageBlogWrapper.classList.add("has-blog-container");
	}
	wrapBlogsInWrapper();
}
