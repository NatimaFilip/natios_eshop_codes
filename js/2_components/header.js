let topNavigationBar = document.querySelector(".top-navigation-bar");
if (topNavigationBar) {
	let headerTop = document.querySelector(".header-top");
	if (headerTop) {
		let projectPhone = topNavigationBar.querySelector(".project-phone");
		if (projectPhone) {
			headerTop.appendChild(projectPhone);

			const contactHours = document.createElement("span");
			contactHours.classList.add("opening-hours");
			contactHours.textContent = translationsStrings.contactHours[activeLang];
			projectPhone.appendChild(contactHours);
		}

		let loginBtn = topNavigationBar.querySelector(".top-nav-button-login");
		if (loginBtn) {
			headerTop.appendChild(loginBtn);
		}
	}
}
