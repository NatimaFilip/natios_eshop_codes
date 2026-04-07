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

		let newsItems = document.querySelectorAll(".news-item");
		if (!newsItems || newsItems.length === 0) return;

		let homepageBlogWrapper = document.documentElement.querySelector(".homepage-blog-wrapper");

		let homepageBlogItemsContainer = document.createElement("div");
		homepageBlogItemsContainer.className = "homepage-blog-items-container";

		let homepageBlogItemsContainerWrapper = document.createElement("div");
		homepageBlogItemsContainerWrapper.className = "homepage-blog-items-container-wrapper";
		homepageBlogItemsContainerWrapper.appendChild(homepageBlogItemsContainer);

		// insert before 1st news item
		/* 		let firstNewsItem = newsItems[0];
		firstNewsItem.parentNode.insertBefore(homepageBlogWrapper, firstNewsItem); */

		newsItems.forEach((item) => {
			homepageBlogItemsContainer.appendChild(item);
		});
		homepageBlogItemsContainerWrapper.appendChild(homepageBlogItemsContainer);

		let footerBanners = document.querySelector(".footer-banners");
		if (footerBanners) {
			//insert homepage blog wrapper after footer banners
			footerBanners.parentNode.insertBefore(homepageBlogItemsContainerWrapper, footerBanners.nextSibling);
		}

		inicializeSliderElement(
			homepageBlogItemsContainerWrapper,
			homepageBlogItemsContainer,
			newsItems,
			"blog-slider",
			"img",
		);
		homepageBlogItemsContainer;

		homepageBlogWrapper.classList.add("has-blog-container");
	}
	wrapBlogsInWrapper();
}
