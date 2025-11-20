const mediaSizes = {
	desktop: 1280,
	tablet: 768,
};
let isMobile = false;
let isTablet = false;
let isDesktop = false;

checkMediaSizes();
document.addEventListener("resizeX", function () {
	checkMediaSizes();
});

function checkMediaSizes() {
	if (window.innerWidth < mediaSizes.tablet) {
		isMobile = true;
		isTablet = false;
		isDesktop = false;
	}
	if (window.innerWidth >= mediaSizes.tablet && window.innerWidth < mediaSizes.desktop) {
		isMobile = false;
		isTablet = true;
		isDesktop = false;
	}
	if (window.innerWidth >= mediaSizes.desktop) {
		isMobile = false;
		isTablet = false;
		isDesktop = true;
	}
}
