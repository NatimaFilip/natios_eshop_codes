//body body contains in-index
if (body.classList.contains("in-index")) {
	carouselThumbnails();
	carouselSlideForMobile();
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

function carouselSlideForMobile() {
	let carousel = document.querySelector("#carousel");
	if (!carousel) return;

	let carouselInner = carousel.querySelector(".carousel-inner");
	if (!carouselInner) return;

	let carouselControlLeft = carousel.querySelector(".carousel-control.left");
	let carouselControlRight = carousel.querySelector(".carousel-control.right");
	if (!carouselControlLeft || !carouselControlRight) return;

	carouselControlLeft.classList.add("hidden");

	carouselControlLeft.addEventListener("click", () => {
		carouselInner.scrollBy({
			left: -carouselInner.clientWidth,
			behavior: "smooth",
		});
	});

	carouselControlRight.addEventListener("click", () => {
		carouselInner.scrollBy({
			left: carouselInner.clientWidth,
			behavior: "smooth",
		});
	});

	//event listener on scroll of carouselInner, if scroll to left is 0, hide left control, else show it
	carouselInner.addEventListener("scroll", () => {
		if (carouselInner.scrollLeft === 0) {
			carouselControlLeft.classList.add("hidden");
		} else {
			carouselControlLeft.classList.remove("hidden");
		}
		//if scroll to right is max, hide right control, else show it
		if (carouselInner.scrollLeft + carouselInner.clientWidth + 1 >= carouselInner.scrollWidth) {
			carouselControlRight.classList.add("hidden");
		} else {
			carouselControlRight.classList.remove("hidden");
		}
	});
}
