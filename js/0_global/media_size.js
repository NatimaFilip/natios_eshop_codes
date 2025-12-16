const mediaSizes = {
	desktop: 1280,
	smallTabletMax: 1023,
	tablet: 768,
};
let isMobile = false;
let isTablet = false;
let isSmallTablet = false;
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
	if (window.innerWidth <= mediaSizes.smallTabletMax) {
		isSmallTablet = true;
	} else {
		isSmallTablet = false;
	}
}
