if (body.classList.contains("type-product")) {
	updateDetailParametersUrls();
	function updateDetailParametersUrls() {
		let detailParameters = document.querySelector(".extended-description .detail-parameters");
		if (!detailParameters) {
			return;
		}

		let breadcrumbLinks = Array.from(
			document.querySelectorAll(".breadcrumbs.navigation-home-icon-wrapper a[href]")
		).filter(a => !a.closest("#navigation-first"));

		if (breadcrumbLinks.length < 2) {
			return;
		}
		let baseUrl = breadcrumbLinks[breadcrumbLinks.length - 2].getAttribute("href");

		let links = detailParameters.querySelectorAll("a");
		links.forEach((link, index) => {
			if (index === 0) return;
			let href = link.getAttribute("href");
			let queryStart = href.indexOf("?");
			if (queryStart !== -1) {
				link.setAttribute("href", baseUrl + href.slice(queryStart));
			} else {
				link.setAttribute("href", baseUrl);
			}
		});
	}
}
