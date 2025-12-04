function editFooterInstagram() {
	if (!footer) return;

	let iGFooterButton = footer.querySelector(".instagram-follow-btn a");
	if (!iGFooterButton) return;

	let iGFooterButtonLink = iGFooterButton.getAttribute("href");
	if (!iGFooterButtonLink) return;

	let iGHeading = footer.querySelector("h4");
	if (!iGHeading) return;

	let accountName = iGFooterButtonLink.split("https://www.instagram.com/")[1];
	if (accountName.endsWith("/")) {
		accountName = accountName.slice(0, -1);
	}

	const link = document.createElement("a");
	link.href = iGFooterButtonLink;
	link.target = "_blank";
	link.rel = "noopener";

	const followText = document.createElement("span");
	followText.className = "ig-follow-text";
	followText.textContent = translationsStrings.followOnInstagram[activeLang];

	const accountNameSpan = document.createElement("span");
	accountNameSpan.className = "ig-account-name";
	accountNameSpan.textContent = accountName;

	link.appendChild(followText);
	link.appendChild(document.createTextNode(" "));
	link.appendChild(accountNameSpan);

	iGHeading.innerHTML = "";
	iGHeading.appendChild(link);
}

editFooterInstagram();
