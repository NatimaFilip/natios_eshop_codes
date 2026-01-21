/*-----------------------------------------------------BLOG*/
if (document.body.classList.contains("in-blog") && document.body.classList.contains("type-post")) {
	document.addEventListener("DOMContentLoaded", function () {
		articleNav();
		blogAutor();
		fetchAndAppendRelatedBlogs();
		fetchAndAppendBlogProducts();
		fetchAndAppendBlogCategory();

		function blogAutor() {
			$("#content p").each(function () {
				if (/##AUTOR##KATEŘINAT/i.test($(this).text())) {
					if (document.body.classList.contains("cs")) {
						$(this).replaceWith(
							'<div id="blog-author"><div class="author-image"><img src="https://www.natima.cz/user/documents/upload/Blog/autori/KaterinaTranova.webp" alt="Kateřina" width="500" height="500"></div><div class="author-text"><p class="author-label">Autor</p><p class="author-name">Kateřina</p><div class="expandale author-text"><div class="expanding"><p>Zajímám se o zdravý životní styl, sport, kosmetiku a zdravou stravu. Mým cílem je inspirovat ostatní, aby pečovali o své tělo i mysl a stali se tou nejlepší verzí sebe samých. Pravidelně se věnuji různým sportovním aktivitám a hledám nové cesty, jak optimalizovat svou fyzickou kondici i duševní pohodu.</p><p>Zdravá strava je pro mě klíčovým prvkem, který podporuje mé zdraví a energii. Kromě sportu a výživy mě baví objevovat nové kosmetické trendy a produkty, které podporují přirozenou krásu a zdraví. Ve volném čase si ráda přečtu dobrou knihu, která mi poskytne nejen odpočinek, ale i nové poznatky. Na blogu se s vámi podělím o své zkušenosti, tipy a rady, jak žít zdravěji a spokojeněji.</p></div></div></div></div>',
						);
					}
					if (document.body.classList.contains("sk")) {
						$(this).replaceWith(
							'<div id="blog-author"><div class="author-image"><img src="https://www.natima.cz/user/documents/upload/Blog/autori/KaterinaTranova.webp" alt="Kateřina" width="500" height="500"></div><div class="author-text"><p class="author-label">Autor</p><p class="author-name">Kateřina</p><div class="expandale author-text"><div class="expanding"><p>Zaujímam sa o zdravý životný štýl, šport, kozmetiku a zdravú stravu. Môj cieľ je inšpirovať ostatných, aby sa starali o svoje telo aj myseľ a stali sa tou najlepšou verziou seba samých. Pravidelne sa venujem rôznym športovým aktivitám a hľadám nové cesty, ako optimalizovať svoju fyzickú kondíciu aj duševnú pohodu.</p><p>Zdravá strava je pre mňa kľúčovým prvkom, ktorý podporuje moje zdravie a energiu. Okrem športu a výživy ma baví objavovať nové kozmetické trendy a produkty, ktoré podporujú prirodzenú krásu a zdravie. Vo voľnom čase si rada prečítam dobrú knihu, ktorá mi poskytne nielen oddych, ale aj nové poznatky. Na blogu sa s vami podelím o svoje skúsenosti, tipy a rady, ako žiť zdravšie a spokojnejšie.</p></div></div></div></div>',
						);
					}
					if (document.body.classList.contains("pl")) {
						$(this).replaceWith(
							'<div id="blog-author"><div class="author-image"><img src="https://www.natima.cz/user/documents/upload/Blog/autori/KaterinaTranova.webp" alt="Kasia" width="500" height="500"></div><div class="author-text"><p class="author-label">Autor</p><p class="author-name">Kasia</p><div class="expandale author-text"><div class="expanding"><p>Interesuję się zdrowym stylem życia, sportem, metodami pielęgnacji skóry i zdrowym odżywianiem. Moim celem jest inspirowanie innych do dbania o ciało i umysł oraz stawania się najlepszą wersją siebie. Regularnie uprawiam różne sporty i poszukuję nowe sposoby na poprawę kondycji fizycznej i zdrowia psychicznego.</p><p>Zdrowa dieta jest dla mnie kluczowym elementem wspierającym moje zdrowie i energię. Oprócz sportu i zdrowego odżywiania lubię odkrywać nowe trendy w branży kosmetycznej oraz produkty, które promują naturalne piękno i zdrowie. W wolnym czasie lubię przeczytać dobrą książkę, która nie tylko pozwala mi się zrelaksować, ale także dowiedzieć się czegoś nowego. Na blogu będę dzielić się z Tobą moimi doświadczeniami, wskazówkami i poradami dotyczącymi tego, jak żyć zdrowszym i szczęśliwszym życiem.</p></div></div></div></div>',
						);
					}
				}
			});
		}

		function generateId(text) {
			return text
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/\s+/g, "-")
				.toLowerCase();
		}

		function articleNav() {
			const content = document.querySelector("#content");
			/* 	const headings = Array.from(content.querySelectorAll("h2, h3, h4, h5")); */
			const headings = Array.from(content.querySelectorAll("h2"));
			const nav = document.createElement("div");
			nav.classList.add("article-nav");
			const navList = document.createElement("ul");

			let currentUl = navList;
			let lastLevel = 2;

			/* 	//remove last two h3
			for (let i = 0; i < 2; i++) {
				const lastH3Index = headings.map((h) => h.tagName).lastIndexOf("H3");
				if (lastH3Index !== -1) {
					headings.splice(lastH3Index, 1);
				}
			} */

			headings.forEach((heading) => {
				const level = parseInt(heading.tagName.substring(1));
				const id = generateId(heading.textContent);
				heading.id = id;

				const li = document.createElement("li");
				const a = document.createElement("a");
				a.href = `#${id}`;
				a.textContent = heading.textContent;
				li.appendChild(a);

				if (level > lastLevel) {
					const newUl = document.createElement("ul");
					currentUl.lastElementChild.appendChild(newUl);
					currentUl = newUl;
				} else if (level < lastLevel) {
					currentUl = navList;
					for (let i = 2; i < level; i++) {
						currentUl = currentUl.lastElementChild.querySelector("ul");
					}
				}

				currentUl.appendChild(li);
				lastLevel = level;
			});

			const articleContent = document.createElement("div");
			articleContent.classList.add("article-content");
			articleContent.appendChild(navList);

			const whatFind = document.createElement("div");
			whatFind.id = "open-article-nav";

			const span1whatFind = document.createElement("span");

			if (document.body.classList.contains("cs")) {
				span1whatFind.textContent = "Co v článku najdete?";
			}
			if (document.body.classList.contains("sk")) {
				span1whatFind.textContent = "Čo v článku nájdete?";
			}
			if (document.body.classList.contains("pl")) {
				span1whatFind.textContent = "Co znajdziesz w artykule?";
			}

			whatFind.appendChild(span1whatFind);

			nav.appendChild(whatFind);
			nav.appendChild(articleContent);

			nav.classList.add("open");

			whatFind.addEventListener("click", function () {
				nav.classList.toggle("open");
			});

			// Insert after the first img in #content
			/* 	const firstImg = content.querySelector("img");
			if (firstImg) {
				const parent = firstImg.parentElement;
				parent.insertAdjacentElement("afterend", nav);
			} else {
				content.insertBefore(nav, content.firstChild);
			} */

			//insert before 1st h2
			const firstH2 = content.querySelector("h2");
			if (firstH2) {
				firstH2.insertAdjacentElement("beforebegin", nav);
			}

			document.querySelectorAll(".article-nav a").forEach((anchor) => {
				anchor.addEventListener("click", function (e) {
					e.preventDefault();
					const targetId = this.getAttribute("href").substring(1);
					const targetElement = document.getElementById(targetId);

					scrollToElement(targetElement);
				});
			});
		}

		async function fetchAndAppendRelatedBlogs() {
			let blogURLs = [];
			let maxNumberOfBlogs = 5;

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##BLOG##/i.test(text)) {
					let urlMatch = text.match(/https?:\/\/[^\s]+/);
					if (urlMatch && blogURLs.length < maxNumberOfBlogs) {
						blogURLs.push(urlMatch[0]);
					}
					$(this).remove();
					$("#content .next-prev").remove();
				}
			});

			if (blogURLs.length > 0) {
				let relatedBlogsDiv = $("<div>", { class: "blog-fetched-related" });
				let blogURL = "";
				let showBlogText = "";
				let showBlogHeadingText = "";

				if (document.body.classList.contains("cs")) {
					blogURL = "/blog/";
					showBlogText = "Zobrazit všechny články";
					showBlogHeadingText = "Další zajímavé články";
				}
				if (document.body.classList.contains("sk")) {
					blogURL = "/blog/";
					showBlogText = "Zobraziť všetky články";
					showBlogHeadingText = "Další zajímavé články";
				}
				if (document.body.classList.contains("pl")) {
					blogURL = "/blog/";
					showBlogText = "Zobacz wszystkie artykuły";
					showBlogHeadingText = "Inne interesujące artykuły";
				}

				let showBlogButton = $("<div>", { class: "show-all-blog-btn" }).append(
					$("<a>", { href: blogURL, target: "_blank" }).text(showBlogText),
				);
				let showBlogHeading = $("<h3>", { class: "show-blog-heading" }).text(showBlogHeadingText);

				for (let url of blogURLs) {
					try {
						const response = await fetch(url);
						const text = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(text, "text/html");
						const metaImage = doc.querySelector('meta[property="og:image"]').getAttribute("content");
						const metaSection = doc.querySelector('meta[property="article:section"]').getAttribute("content");
						let metaDescription = doc.querySelector('meta[itemprop="description"]').getAttribute("content");

						if (metaImage && metaSection && metaDescription) {
							// Create an anchor element
							let anchorElement = $("<a>", { href: url, target: "_blank" });

							// Create an img element
							let blogImage = $("<img>", {
								src: metaImage,
								alt: "Blog Image",
							});

							// Create a paragraph element for the meta section content
							let blogName = $("<h4>").text(metaSection);

							// Create a paragraph element for the meta description content
							metaDescription = metaDescription.replace(/&nbsp;/g, " ");
							let blogDescdription = $("<p>").text(metaDescription);

							// Append the img, section paragraph, and description paragraph elements to the anchor element
							anchorElement.append(blogImage);
							anchorElement.append(blogName);
							anchorElement.append(blogDescdription);

							// Append the anchor element to the relatedBlogsDiv
							relatedBlogsDiv.append(anchorElement);
						}
					} catch (error) {
						console.error("Error fetching related blog data:", error);
					}
				}
				const relatedBlogsWrapper = document.createElement("div");
				relatedBlogsWrapper.classList.add("related-blogs-wrapper");
				relatedBlogsWrapper.appendChild(relatedBlogsDiv[0]);
				/* relatedBlogsWrapper.append(showBlogHeading); */
				relatedBlogsWrapper.append(relatedBlogsDiv);
				/* relatedBlogsWrapper.append(showBlogButton); */

				let divText = $("div.text");
				divText.append(relatedBlogsWrapper);
			}
		}

		async function fetchAndAppendBlogProducts() {
			let productURLs = [];
			let firstProductParagraph = null;
			let maxNumberOfProducts = 4;

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##PRODUKT##/i.test(text)) {
					if (!firstProductParagraph) {
						firstProductParagraph = $(this);
					}
					let urlMatch = text.match(/https?:\/\/[^\s]+/);
					if (urlMatch && productURLs.length < maxNumberOfProducts) {
						productURLs.push(urlMatch[0]);
					}
				}
			});

			if (productURLs.length > 0 && firstProductParagraph) {
				let blogProductsDiv = $("<div>", { class: "blog-fetched-products" });

				for (let url of productURLs) {
					try {
						const response = await fetch(url);
						const text = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(text, "text/html");
						const metaImage = doc.querySelector('meta[property="og:image"]');
						const metaName = doc.querySelector('meta[itemprop="name"]');

						if (metaImage && metaName) {
							// Create an anchor element
							let anchorElement = $("<a>", { href: url, target: "_blank" });

							// Create a paragraph element for the meta name content
							let productName = $("<p>").text(metaName.getAttribute("content"));

							// Create an img element
							let blogImage = $("<img>", {
								src: metaImage.getAttribute("content"),
								alt: productName,
							});

							// Append the img element and the paragraph element to the anchor element
							anchorElement.append(blogImage);
							anchorElement.append(productName);

							const showBtn = document.createElement("div");
							showBtn.classList.add("show-product-btn");
							showBtn.textContent = "Zobrazit produkt";
							anchorElement.append(showBtn);

							// Append the anchor element to the blogProductsDiv
							blogProductsDiv.append(anchorElement);
						}
					} catch (error) {
						console.error("Error fetching product data:", error);
					}
				}

				// Insert the blogProductsDiv before the first found paragraph
				firstProductParagraph.before(blogProductsDiv);

				// Remove the paragraphs containing ##PRODUKT##
				$("p").each(function () {
					let text = $(this).text();
					if (/##PRODUKT##/i.test(text)) {
						$(this).remove();
					}
				});
			}
		}

		fetchAndAppendBlogCategory();
		async function fetchAndAppendBlogCategory() {
			let productRequests = [];
			let maxNumberOfProducts = 4;

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##KATEGORIE##/i.test(text)) {
					let match = text.match(/##KATEGORIE##(\d+)\s+(https?:\/\/[^\s]+)/);
					if (match) {
						let numberOfProducts = Math.min(parseInt(match[1], 10), maxNumberOfProducts);
						let url = match[2];
						productRequests.push({ numberOfProducts, url, paragraph: $(this) });
					}
				}
			});

			if (productRequests.length > 0) {
				for (let request of productRequests) {
					let blogProductsDiv = $("<div>", { class: "blog-fetched-category" });

					try {
						const response = await fetch(request.url);
						const text = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(text, "text/html");
						const products = doc.querySelectorAll("#products > .product");

						for (let i = 0; i < request.numberOfProducts && i < products.length; i++) {
							let product = products[i].cloneNode(true);

							// Replace src with data-src for all img elements
							$(product)
								.find("img")
								.each(function () {
									let dataSrc = $(this).attr("data-src");
									if (dataSrc) {
										$(this).attr("src", dataSrc);
									}
								});
							$(product).find("a.image").append($(product).find(".p-in"));
							blogProductsDiv.append(product);
						}

						let showCategoryText = "";
						if (document.body.classList.contains("cs")) {
							showCategoryText = "Zobrazit vše";
						}
						if (document.body.classList.contains("sk")) {
							showCategoryText = "Zobraziť všetko";
						}
						if (document.body.classList.contains("pl")) {
							showCategoryText = "Zobacz wszystko";
						}

						// Create the show-all-blog-btn div with an anchor inside
						let showBlogButtonDiv = $("<div>", { class: "show-all-blog-btn" }).append(
							$("<a>", { href: request.url, target: "_blank" }).text(showCategoryText),
						);

						// Insert the blogProductsDiv before the paragraph containing ##KATEGORIE##
						request.paragraph.before(blogProductsDiv);

						// Insert the show-all-blog-btn div before the paragraph containing ##KATEGORIE##
						request.paragraph.before(showBlogButtonDiv);

						// Remove the paragraph containing ##KATEGORIE##
						request.paragraph.remove();
					} catch (error) {
						console.error("Error fetching blog products:", error);
					}
				}
			}
		}
	});
}
