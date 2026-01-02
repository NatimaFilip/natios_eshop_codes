function natiosSupportingBottom() {
	const natiosLargeBrandBlock = document.createElement("div");
	natiosLargeBrandBlock.className = "natios-support-wrapper";
	natiosLargeBrandBlock.innerHTML =
		'<div class="natios-support-icon"><img src="https://cdn.myshoptet.com/usr/www.natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg" alt="Natios Charity" width="174" height="174"></div><div class="natios-support-wrapper-content"><div class="natios-support-wrapper-content-title">' +
		translationsStrings.natiosSupportHeaderBottom[activeLang] +
		" </div><p>" +
		translationsStrings.natiosSupportTextBottom[activeLang] +
		"</p><p>" +
		translationsStrings.natiosSupportTotalAmount[activeLang] +
		'</p><p><a href="' +
		translationsStrings.natiosSupportBlogUrl[activeLang] +
		'">' +
		translationsStrings.moreAboutSupport[activeLang] +
		"</a></p></div>";

	let manufacturerDescription = document.querySelector("#manufacturerDescription");

	if (manufacturerDescription) {
		manufacturerDescription.after(natiosLargeBrandBlock);
	}
}

if (body.classList.contains("type-product")) {
	natiosSupportingBottom();
}
