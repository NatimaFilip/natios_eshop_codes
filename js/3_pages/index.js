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

function wrapBlogsInWrapper() {
	if (!body.classList.contains("in-index")) {
		return;
	}
	let newsItems = document.querySelectorAll(".news-item");
	if (!newsItems || newsItems.length === 0) return;
	let homepageBlogWrapper = document.createElement("div");
	homepageBlogWrapper.className = "homepage-blog-wrapper-custom";

	// insert before 1st news item
	let firstNewsItem = newsItems[0];
	firstNewsItem.parentNode.insertBefore(homepageBlogWrapper, firstNewsItem);

	for (let i = 0; i < newsItems.length; i++) {
		homepageBlogWrapper.appendChild(newsItems[i]);
	}
}
