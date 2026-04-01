let appendDiv = document.querySelector("#content");

fetchKariera();

async function fetchKariera() {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/NatimaFilip/natima_eshop_files/refs/heads/main/data/kariera.json",
		);
		const data = await response.json();

		let container = document.querySelector("#content");
		let jobs = Object.values(data.sheets);

		jobs.forEach((job) => {
			console.log(job);
			/*
Toto jsou data, které to consol logne ↓
Je to ve formátu
"Key": "Value"
{
    "Název pozice": "Grafik",
    "Typ úvazku": "HPP / IČO",
    "Náplň práce": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra nisl nisi, sed sodales urna eleifend ac. Pellentesque porta erat eget nibh lobortis, venenatis ullamcorper odio ultricies. Mauris diam felis, sollicitudin a tortor vel, varius tincidunt nisl. Donec odio urna, dignissim at ipsum non, luctus auctor turpis. Aliquam maximus velit at hendrerit finibus. Vestibulum faucibus ullamcorper purus pretium ornare. Aenean feugiat lectus urna, ut pulvinar sapien varius non. Phasellus consectetur sit amet nisi eu gravida. Praesent sagittis ex eget lacus rhoncus pharetra.",
    "Požadavky": "Praxe v grafice; Pokročilá znalost Adobe Photoshop a Illustrator; Samostatnost; Lorem ipsum",
    "Platové ohodnocení": 100000,
    "Délka úvazku": "Rok a poté na neurčito"
}
*/
			//DALŠÍ POSTUP:
			//Vytvořit div pro každý job s classou "job"

			//Další forEach loop pro každý key
			//Pro každý key udělej div s classou "job-property"
			//Pro Key udělej element H3 s text contentem Key
			//Pro Value udělej element p s text contentem Value
			//H3 a P element appendni do job-property
			//job-propperty appendni do job

			//job appendni
		});

		/*Tady chyběl catch, proto to hlásilo chybu*/
	} catch {
		console.error("Error");
	}
}
