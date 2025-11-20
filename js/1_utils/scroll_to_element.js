function scrollToElement(element) {
	const headerHeight = document.querySelector("#header").offsetHeight;
	window.scrollTo({
		top: element.getBoundingClientRect().top + window.pageYOffset - headerHeight,
		behavior: "smooth",
	});
}
