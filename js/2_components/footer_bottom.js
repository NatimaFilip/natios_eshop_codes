function footerBottomEdit() {
	if (!footer) return;

	let footerSocials = footer.querySelector(".footer-socials");
	if (!footerSocials) return;

	let footerBottom = footer.querySelector(".footer-bottom");
	if (!footerBottom) return;

	footerBottom.prepend(footerSocials);

	let signature = footer.querySelector("#signature");
	if (!signature) return;

	const spanAnd = document.createElement("span");
	spanAnd.textContent = " & ";
	signature.appendChild(spanAnd);

	const filipHosek = document.createElement("a");
	filipHosek.href = "https://partneri.shoptet.cz/profesionalove/filip-hosek/";
	filipHosek.target = "_blank";
	filipHosek.rel = "noopener";
	filipHosek.className = "footer-signature-filip-hosek";
	filipHosek.textContent = "Filip Hošek";
	signature.appendChild(filipHosek);
}
footerBottomEdit();
