function goTopBtn() {
	const goTopBtn = document.querySelector(".goToTop__button");
	if (!goTopBtn) return;

	goTopBtn.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}

goTopBtn();
