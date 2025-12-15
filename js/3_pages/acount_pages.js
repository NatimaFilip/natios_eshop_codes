if (body.classList.contains("customer-page")) {
	removeMojeFromSidebar();
	wrapAnyTable();
}

function removeMojeFromSidebar() {
	const sidebar = document.querySelector(".sidebar");
	if (!sidebar) return;

	const links = sidebar.querySelectorAll("li a");
	const excludedTexts = ["Moje slevy", "Moje hodnocení u produktů"];

	links.forEach((link) => {
		const text = link.textContent.trim();

		// Skip if it's one of the excluded texts
		if (excludedTexts.includes(text)) return;

		// Remove "Moje " from the beginning and trim
		if (text.startsWith("Moje ")) {
			let newText = text.replace(/^Moje\s+/, "").trim();
			// Capitalize first letter
			newText = newText.charAt(0).toUpperCase() + newText.slice(1);
			link.textContent = newText;
		}
	});
}

function wrapAnyTable() {
	const tables = document.querySelectorAll("table");
	tables.forEach((table) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("table-wrapper");
		table.parentNode.insertBefore(wrapper, table);
		wrapper.appendChild(table);

		// Add drag-to-scroll functionality if content overflows
		enableDragging(wrapper);
	});
}
function enableDragging(wrapper) {
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
		startScrollLeft = wrapper.scrollLeft;

		wrapper.classList.add("grabbing");

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
		wrapper.scrollLeft = startScrollLeft - dx;

		e.preventDefault();
	};

	// End/cancel drag
	const endDrag = (e) => {
		if (e && activePointerId !== null && e.pointerId !== activePointerId) return;
		isDragging = false;
		activePointerId = null;
		wrapper.classList.remove("grabbing");

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

	// Attach pointerdown to wrapper so dragging works from wrapper or any child
	wrapper.addEventListener("pointerdown", onPointerDown);
	wrapper.addEventListener("click", onClick);
}
