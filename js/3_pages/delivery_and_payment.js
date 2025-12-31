function deliveryAndPaymentPage() {
	let deliveriesAndPaymentsBlock = document.querySelector(".page-deliveries-and-payments");
	if (!deliveriesAndPaymentsBlock) return;

	let itemsToToggle = deliveriesAndPaymentsBlock.querySelectorAll(".item");
	if (!itemsToToggle || itemsToToggle.length === 0) return;
	itemsToToggle.forEach((item) => {
		expandedToggle(item);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	deliveryAndPaymentPage();
});
