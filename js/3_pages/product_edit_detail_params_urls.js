if (body.classList.contains("type-product")) {
	updateDetailParametersUrls();
	function updateDetailParametersUrls() {
		let detailParameters = document.querySelector(".extended-description .detail-parameters");
		if (!detailParameters) {
			return;
		}

		let nav1Link = document.querySelector("#navigation-1 a");
		if (!nav1Link) {
			return;
		}
		let baseUrl = nav1Link.getAttribute("href");

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
