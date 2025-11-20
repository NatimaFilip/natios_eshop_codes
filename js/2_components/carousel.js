//body body contains in-index
if (body.classList.contains("in-index")) {
	carouselThumbnails();
}

function carouselThumbnails() {
	let carousel = document.querySelector("#carousel");
	if (!carousel) return;

	let items = carousel.querySelectorAll(".item");

	if (!items || items.length === 0) return;

	const thumbNailsWrapper = document.createElement("div");
	thumbNailsWrapper.classList.add("carousel-thumbnails-wrapper");

	items.forEach((item, index) => {
		let thumbNail = item.querySelector(".item-thumbnail");
		if (thumbNail) {
			thumbNailsWrapper.appendChild(thumbNail);
			if (index === 0) {
				thumbNail.classList.add("active");
			}

			thumbNail.addEventListener("click", () => {
				if (thumbNail.classList.contains("active")) return;
				//remove active class from all thumbnails
				let allThumbnails = thumbNailsWrapper.querySelectorAll(".item-thumbnail");
				allThumbnails.forEach((thumb) => {
					thumb.classList.remove("active");
				});
				//add active class to clicked thumbnail
				thumbNail.classList.add("active");

				let allItems = carousel.querySelectorAll(".item");
				allItems.forEach((it) => {
					it.classList.remove("previous");

					if (it.classList.contains("active")) {
						it.classList.remove("active");
						it.classList.add("previous");
					}
				});
				item.classList.add("active");
			});
		}
	});
	carousel.appendChild(thumbNailsWrapper);
}
