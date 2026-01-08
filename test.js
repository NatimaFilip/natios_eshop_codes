if (document.body.classList.contains("entrance-protection-wrapper")) {
	let entranceProt = document.querySelector(".entrance-protection");
	if (entranceProt) {
		const nadpis = document.createElement("div");
		nadpis.classList.add("ochrana-nadpis");
		nadpis.textContent = "xxx";
		entranceProt.prepend(nadpis);
	}
}
