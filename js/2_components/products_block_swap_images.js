const producsBlockImageWidth = "423";
const producsBlockImageHeight = "423";

function customSwapImages() {
	let swapImagesProducts = document.querySelectorAll(".products-block .swap-images");
	if (!swapImagesProducts || swapImagesProducts.length === 0) {
		return; // No products found
	}
	swapImagesProducts.forEach((product) => {
		if (product.parentElement.classList.contains("custom-swap-images-added")) {
			return; // Skip if already processed
		}
		product.parentElement.classList.add("custom-swap-images-added");

		let swapImage = product.querySelector(".swap-image");
		if (!swapImage) {
			console.warn("Swap image not found for a product.");
			return;
		}

		let swapImageA = product.querySelector("a.image");
		if (!swapImageA) {
			console.warn("Image link not found for a product.");
			return;
		}

		const customFirstImage = document.createElement("img");
		customFirstImage.classList.add("custom-first-image");
		customFirstImage.src = swapImage.getAttribute("data-src") || "";
		customFirstImage.setAttribute("data-src", swapImage.getAttribute("data-src") || "");
		customFirstImage.alt = swapImage.alt || "";
		customFirstImage.width = producsBlockImageWidth;
		customFirstImage.height = producsBlockImageHeight;
		customFirstImage.loading = "lazy";
		customFirstImage.fetchPriority = "low";

		const customSecondImage = document.createElement("img");
		customSecondImage.classList.add("custom-second-image");
		customSecondImage.src = swapImage.getAttribute("data-next") || swapImage.src || "";
		customSecondImage.alt = swapImage.alt || "";
		customSecondImage.width = producsBlockImageWidth;
		customSecondImage.height = producsBlockImageHeight;
		customSecondImage.loading = "lazy";
		customSecondImage.fetchPriority = "low";

		swapImage.remove();
		swapImageA.appendChild(customFirstImage);
		swapImageA.appendChild(customSecondImage);
	});
}
customSwapImages();

/* // Remove old swap-images event handlers
$(document).off("mouseenter mouseleave", ".swap-images");
$(document)
	.on("mouseenter", ".swap-images", function () {
		var x = $(this);
		var t = $(this).find(".swap-image");
		if (t.attr("data-next")) {
			var nextSrc = t.attr("data-next");
			t.one("load", function () {
				x.addClass("hovered");
			});
			t.attr("src", nextSrc);
		}
	})
	.on("mouseleave", ".swap-images", function () {
		var x = $(this);
		var t = $(this).find(".swap-image");
		if (t.attr("data-next")) {
			var originalSrc = t.attr("data-src");
			t.one("load", function () {
				x.removeClass("hovered");
			});
			t.attr("src", originalSrc);
		}
	}); */
