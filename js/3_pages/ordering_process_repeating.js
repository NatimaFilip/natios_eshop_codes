if (body.classList.contains("ordering-process")) {
	document.addEventListener("DOMContentLoaded", function () {
		fetchImagesOfProductsInCart();
	});
}
async function fetchImagesOfProductsInCart() {
	let itemNames = document.querySelectorAll(".cart-item .cart-item-name");
	if (!itemNames) return;

	itemNames.forEach(async (itemName) => {
		let productLink = itemName.querySelector("a");
		if (!productLink) return;

		const imageBlock = document.createElement("div");
		imageBlock.classList.add("image-block");
		itemName.parentElement.prepend(imageBlock);

		let productUrl = productLink.href;

		try {
			let response = await fetch(productUrl);
			/* let response = await fetch(window.location.origin + productUrl); */

			if (!response.ok) throw new Error("Network response was not ok");

			let html = await response.text();

			// Parse the HTML string into a document
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, "text/html");

			// Get the image element
			let img = doc.querySelector(".p-main-image > img");

			if (img) {
				// Clone the image so it can be used in the current DOM
				let newImg = document.createElement("img");
				newImg.src = img.src.replace("/big/", "/detail/");
				newImg.alt = img.alt || "";

				// Prepend to itemName
				itemName.parentElement.querySelector(".image-block").append(newImg);
			}
		} catch (error) {
			console.error("There has been a problem with your fetch operation:", error);
		}
	});
}
