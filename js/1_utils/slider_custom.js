function inicializeSliderElement(sliderWrapper, sliderParent, sliderItem, customClass, itemForHeightForControls) {
	if (!sliderParent || !sliderItem || sliderItem.length === 0) {
		console.warn("inicializeSliderElement has been tried to be initialized with invalid parameters.");
		return;
	}

	if (!sliderWrapper) {
		const sliderWrapperElement = document.createElement("div");
		sliderWrapperElement.classList.add("slider-custom-wrapper");
		sliderParent.parentNode.insertBefore(sliderWrapperElement, sliderParent);
		sliderWrapperElement.appendChild(sliderParent);
		sliderWrapper = sliderWrapperElement;
	}
	sliderWrapper.classList.add(customClass, "slider-custom-wrapper");

	createControls();
	enableDragging();

	function createControls() {
		let initialControls = sliderWrapper.querySelectorAll(".carousel-control");
		if (initialControls && initialControls.length > 0) {
			initialControls.forEach((control) => control.remove());
		}

		const leftControl = document.createElement("div");
		leftControl.classList.add("carousel-control", "left", "hidden-control");
		leftControl.setAttribute("role", "button");
		leftControl.setAttribute("data-slide", "prev");

		const rightControl = document.createElement("div");
		rightControl.classList.add("carousel-control", "right");
		rightControl.setAttribute("role", "button");
		rightControl.setAttribute("data-slide", "next");

		sliderWrapper.appendChild(leftControl);
		sliderWrapper.appendChild(rightControl);

		leftControl.addEventListener("click", () => slide("left"));
		rightControl.addEventListener("click", () => slide("right"));

		setTopPositionOfControls();
		document.addEventListener("DOMContentLoaded", setTopPositionOfControls);
		window.addEventListener("resize", setTopPositionOfControls);

		function setTopPositionOfControls() {
			let heightItem;
			if (itemForHeightForControls) {
				heightItem = sliderItem[0].querySelector(itemForHeightForControls);
			} else {
				heightItem = sliderItem[0];
			}
			if (heightItem) {
				const style = window.getComputedStyle(heightItem);
				const marginTop = parseFloat(style.marginTop) || 0;
				const marginBottom = parseFloat(style.marginBottom) || 0;
				const heightOfItem = heightItem.offsetHeight || 0;
				const totalHeight = heightOfItem + marginTop + marginBottom;
				leftControl.style.top = totalHeight / 2 + "px";
				rightControl.style.top = totalHeight / 2 + "px";
				if (totalHeight === 0) {
					leftControl.style.top = "50%";
					rightControl.style.top = "50%";
				}
			} else {
				leftControl.style.top = "50%";
				rightControl.style.top = "50%";
			}
		}

		//if sliderParent is not scrollable hide controls
		if (sliderParent.scrollWidth <= sliderParent.clientWidth) {
			leftControl.classList.add("hidden-control");
			rightControl.classList.add("hidden-control");
		}
	}

	function slide(direction) {
		if (sliderParent.classList.contains("sliding")) return;
		sliderParent.classList.add("sliding");

		const numberOfItems = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--number-of-items")) || 1;
		const gapValue = parseInt(getComputedStyle(sliderParent).getPropertyValue("--gap")) || 0;
		const largeItemMultiplier =
			parseFloat(getComputedStyle(sliderWrapper).getPropertyValue("--width-multiplier-of-1st-item")) - 1 || 0;
		const nextItemPreview = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--next-item-preview")) || 0;

		let scrollAmount;
		/* 	if (sliderItem.length > 2) {
			scrollAmount =
				sliderItem[2]?.offsetWidth * numberOfItems +
					gapValue * (numberOfItems - largeItemMultiplier - 1) +
					nextItemPreview || 200;
			
		} else {
			scrollAmount =
				sliderItem[0]?.offsetWidth * numberOfItems +
					gapValue * (numberOfItems - largeItemMultiplier - 1) +
					nextItemPreview || 200;
		} */

		scrollAmount = sliderParent.offsetWidth - (nextItemPreview - gapValue);

		const to = direction === "left" ? sliderParent.scrollLeft - scrollAmount : sliderParent.scrollLeft + scrollAmount;

		sliderParent.scrollTo({ left: to, behavior: "smooth" });

		setTimeout(() => {
			sliderParent.classList.remove("sliding");
		}, 300);
	}

	function enableDragging() {
		let isDragging = false;
		let startX = 0;
		let startScrollLeft = 0;
		let moved = false;
		let activePointerId = null;
		let moveThreshold = 5; // px

		// Start drag
		const onPointerDown = (e) => {
			// Only primary button if mouse
			if (e.pointerType === "mouse" && e.button !== 0) return;

			isDragging = true;
			moved = false;
			activePointerId = e.pointerId;

			startX = e.clientX;
			startScrollLeft = sliderParent.scrollLeft;

			sliderParent.classList.add("grabbing");

			// Attach move/up/cancel to window for robust dragging
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", endDrag);
			window.addEventListener("pointercancel", endDrag);
			window.addEventListener("pointerleave", endDrag);
		};

		// Drag move
		const onPointerMove = (e) => {
			if (!isDragging || e.pointerId !== activePointerId) return;

			const dx = e.clientX - startX;
			if (Math.abs(dx) > moveThreshold) moved = true;
			sliderParent.scrollLeft = startScrollLeft - dx;

			e.preventDefault();
		};

		// End/cancel drag
		const endDrag = (e) => {
			if (e && activePointerId !== null && e.pointerId !== activePointerId) return;
			isDragging = false;
			activePointerId = null;
			sliderParent.classList.remove("grabbing");

			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", endDrag);
			window.removeEventListener("pointercancel", endDrag);
			window.removeEventListener("pointerleave", endDrag);
		};

		// Suppress clicks if a drag happened (avoids accidental link/card clicks)
		const onClick = (e) => {
			if (moved) {
				e.preventDefault();
				e.stopPropagation();
				moved = false; // reset
			}
		};

		// Attach pointerdown to sliderWrapper so dragging works from wrapper or any child
		sliderWrapper.addEventListener("pointerdown", onPointerDown);
		sliderParent.addEventListener("click", onClick);

		function removeHiddenControl(element) {
			element.classList.remove("hidden-control");
		}
		function addHiddenControl(element) {
			element.classList.add("hidden-control");
		}

		let leftControl = sliderWrapper.querySelector(".carousel-control.left");
		let rightControl = sliderWrapper.querySelector(".carousel-control.right");
		if (leftControl && rightControl) {
			sliderParent.addEventListener("scroll", () => {
				if (sliderParent.scrollLeft <= 0) {
					addHiddenControl(leftControl);
				} else {
					removeHiddenControl(leftControl);
				}

				if (sliderParent.scrollLeft >= sliderParent.scrollWidth - sliderParent.clientWidth - 1) {
					addHiddenControl(rightControl);
				} else {
					removeHiddenControl(rightControl);
				}
			});
		}
	}
}

let allProductsBlocks = document.querySelectorAll(".products-block:not(.products-page)");
if (allProductsBlocks && allProductsBlocks.length > 0) {
	allProductsBlocks.forEach((block) => {
		let productsBlockItems = block.querySelectorAll(".product");
		inicializeSliderElement(null, block, productsBlockItems, "products-slider", "img");
	});
}
