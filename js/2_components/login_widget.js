document.addEventListener("DOMContentLoaded", function () {
	let loginWidget = document.querySelector(".popup-widget.login-widget");
	let topNavButtonLogin = document.querySelector("#header .top-nav-button-login");
	positionOfFixedComponent(loginWidget, topNavButtonLogin, topNavButtonLogin, null, false);
	addCloseToLoginWidget();

	function addCloseToLoginWidget() {
		if (!loginWidget) return;
		if (!topNavButtonLogin) return;

		const loginWidgetCloseBtn = document.createElement("div");
		loginWidgetCloseBtn.classList.add("login-widget-close-btn");

		loginWidget.appendChild(loginWidgetCloseBtn);

		loginWidgetCloseBtn.addEventListener("click", function () {
			topNavButtonLogin.click();
		});
	}
});
