/* 
let appendDiv = document.querySelector("#content");
const test = document.createElement("div");
test.style.backgroundColor = "red";
test.style.height = "100px";
appendDiv.appendChild(test);
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

			const jobDiv = document.createElement("div");
			jobDiv.classList.add("job");

			Object.entries(job).forEach(([key, value]) => {
				const propertyDiv = document.createElement("div");
				propertyDiv.classList.add("job-property");

				const title = document.createElement("h3");
				title.textContent = key;

				const description = document.createElement("p");
				description.textContent = value;

				propertyDiv.appendChild(title);
				propertyDiv.appendChild(description);

				jobDiv.appendChild(propertyDiv);
			});

			container.appendChild(jobDiv);
		});
	} catch (error) {
		console.error("Error:", error);
	}
}
 */
