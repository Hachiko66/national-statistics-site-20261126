/* Statistik Nusantara — page renderers.
   Each route is a function that returns an HTML string for #view.
   All figures come from NUSANTARA in data.js; nothing is fetched. */

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sourceNote(text) {
  return `<p class="source-note">Source: ${esc(text)}</p>`;
}

function statCard(label, value, sub) {
  return `<div class="stat-card"><div class="stat-label">${esc(label)}</div>` +
    `<div class="stat-value">${esc(value)}</div>` +
    `<div class="stat-sub">${esc(sub)}</div></div>`;
}

function pageHead(kicker, title, intro) {
  return `<p class="kicker">${esc(kicker)}</p><h1>${esc(title)}</h1>` +
    `<p class="lede">${esc(intro)}</p>`;
}

/* ---------- Overview ---------- */

function viewOverview(year) {
  const d = NUSANTARA.headline[year];
  const opts = NUSANTARA.years.map(y =>
    `<option value="${y}"${y === year ? " selected" : ""}>${y}</option>`).join("");
  const cards =
    statCard("Population", d.population.toFixed(1) + " million", "BPS mid-year estimate, " + year) +
    statCard("GDP", "Rp " + d.gdp.toLocaleString("en-US") + " trillion", "Current prices, BPS " + year) +
    statCard("GDP growth", d.gdpGrowth.toFixed(2) + "%", "Year on year, BPS " + year) +
    statCard("GDP per capita", "US$" + d.gdpPerCapita.toLocaleString("en-US"), "BPS / World Bank, " + year) +
    statCard("Inflation", d.inflation.toFixed(2) + "%", "December year on year, BPS " + year) +
    statCard("Unemployment", d.unemployment.toFixed(2) + "%", "August round, BPS " + year) +
    statCard("Poverty rate", d.poverty.toFixed(2) + "%", "September round, BPS " + year) +
    statCard("Human Development Index", d.hdi.toFixed(2), "BPS " + year + " — high development");
  const facts = NUSANTARA.facts.map(f =>
    `<tr><th scope="row">${esc(f.label)}</th><td>${esc(f.value)}</td><td class="muted">${esc(f.note)}</td></tr>`).join("");
  return pageHead("Indonesia · National statistics", "Indonesia at a glance",
      "The headline numbers for the world's fourth most populous country — " +
      "an archipelago of more than 17,000 islands, the largest economy in Southeast Asia, " +
      "and a democracy of 281 million people. Pick a year to compare.") +
    `<div class="toolbar"><label for="year-select">Year</label>` +
    `<select id="year-select" data-control="year">${opts}</select>` +
    `<span class="toolbar-note">All figures update when you change the year.</span></div>` +
    `<div class="stat-grid">${cards}</div>` +
    `<div class="two-col">` +
    `<section class="panel"><h2>Growth, year by year</h2>` +
    lineChart(NUSANTARA.gdpGrowthSeries.map(p => ({ label: String(p.year), value: p.value })),
      { unit: "%", color: "#0e6b5c" }) +
    `<p class="caption">Real GDP growth, % year on year. The 2020 dip is the COVID-19 recession; ` +
    `growth has run above 5% since 2022.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2019–2024.") + `</section>` +
    `<section class="panel"><h2>Indonesia in brief</h2>` +
    `<table class="fact-table"><tbody>${facts}</tbody></table>` +
    `<p class="caption">The capital is moving from Jakarta to Nusantara (IKN) in East Kalimantan; ` +
    `Jakarta remains the seat of government during the transition.</p>` +
    sourceNote("BPS 2024; World Bank 2023; APJII 2024; UN World Population Prospects 2024.") +
    `</section></div>` +
    `<section class="panel"><h2>Where to look next</h2><div class="link-cards">` +
    `<a class="link-card" href="#/population"><strong>Population &amp; Demographics</strong><span>281.6 million people, age structure and density</span></a>` +
    `<a class="link-card" href="#/economy"><strong>Economy</strong><span>GDP, growth, sectors and trade</span></a>` +
    `<a class="link-card" href="#/prices"><strong>Prices &amp; Inflation</strong><span>Consumer prices, 2019–2024</span></a>` +
    `<a class="link-card" href="#/employment"><strong>Employment</strong><span>Jobs, sectors and unemployment</span></a>` +
    `<a class="link-card" href="#/poverty"><strong>Poverty &amp; Welfare</strong><span>Poverty, inequality and human development</span></a>` +
    `<a class="link-card" href="#/regions"><strong>Provinces &amp; Regions</strong><span>All 38 provinces compared</span></a>` +
    `</div></section>`;
}

/* ---------- Population ---------- */

function viewPopulation() {
  return pageHead("Population & Demographics", "281.6 million people",
      "Indonesia is the world's fourth most populous country. The population grows by " +
      "about 2–3 million people a year, and more than half of everyone lives on Java.") +
    `<div class="stat-grid">` +
    statCard("Population, 2024", "281.6 million", "BPS mid-year estimate") +
    statCard("Annual growth", "0.82%", "BPS, 2023–2024") +
    statCard("Density", "148 / km²", "National average, 2024") +
    statCard("Median age", "30.4 years", "UN World Population Prospects, 2024") +
    `</div>` +
    `<div class="two-col">` +
    `<section class="panel"><h2>Population growth</h2>` +
    barChart(NUSANTARA.populationSeries.map(p => ({ label: String(p.year), value: p.value })),
      { unit: "m", highlightLast: true }) +
    `<p class="caption">Population in millions. 2020 is the census count; other years are mid-year estimates.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2019–2024.") + `</section>` +
    `<section class="panel"><h2>Age structure, 2024</h2>` +
    donutChart(NUSANTARA.ageStructure2024.map((a, i) => ({
        label: a.group, value: a.share,
        color: ["#0e6b5c", "#d98e1f", "#8fb8ad"][i] })),
      "of the population", "15–64: 68.9%") +
    `<p class="caption">Indonesia is in its demographic bonus years: almost 7 in 10 people are of working age. ` +
    `The share aged 65 and over is still small, but it is rising every year.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2024.") + `</section></div>` +
    `<section class="panel"><h2>Where people live</h2><p>${esc(NUSANTARA.densityNote)}</p>` +
    `<p>Java's five provinces plus Jakarta hold roughly 157 million people. Sumatra holds about 61 million, ` +
    `Kalimantan about 17 million, Sulawesi about 20 million, and Papua about 6 million. ` +
    `The government is moving the capital to Nusantara in East Kalimantan partly to spread growth beyond Java.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2024.") + `</section>`;
}

/* ---------- Economy ---------- */

function viewEconomy(tab) {
  tab = tab || "growth";
  const tabs = [["growth", "Growth"], ["sectors", "Sectors"], ["trade", "Trade"]]
    .map(([id, label]) =>
      `<button class="tab${tab === id ? " active" : ""}" data-control="tab" data-tab="${id}">${label}</button>`).join("");
  let body = "";
  if (tab === "growth") {
    body = `<section class="panel"><h2>Real GDP growth</h2>` +
      lineChart(NUSANTARA.gdpGrowthSeries.map(p => ({ label: String(p.year), value: p.value })),
        { unit: "%", color: "#0e6b5c" }) +
      `<p class="caption">Real GDP growth, % year on year. Indonesia grew 5.03% in 2024 on household ` +
      `consumption, investment and exports, after 5.05% in 2023.</p>` +
      sourceNote("BPS — Statistics Indonesia, 2019–2024.") + `</section>` +
      `<div class="stat-grid">` +
      statCard("GDP, 2024", "Rp 22,139 trillion", "Current prices, BPS") +
      statCard("GDP per capita, 2024", "US$4,960", "BPS / World Bank") +
      statCard("Largest economy", "No. 1 in ASEAN", "By nominal GDP, 2024") +
      statCard("Growth target", "5.2% in 2025", "State budget assumption") +
      `</div>`;
  } else if (tab === "sectors") {
    body = `<section class="panel"><h2>What the economy is made of</h2>` +
      hbarChart(NUSANTARA.gdpBySector2024, { unit: "%" }) +
      `<p class="caption">Share of current-price GDP, 2024. Manufacturing is the largest single sector; ` +
      `agriculture still produces about an eighth of GDP and employs more than a quarter of workers.</p>` +
      sourceNote("BPS — Statistics Indonesia, 2024.") + `</section>`;
  } else {
    const t = NUSANTARA.trade2024.map(x =>
      statCard(x.label, "US$" + x.value.toFixed(1) + "bn", x.unit + ", BPS 2024")).join("");
    body = `<div class="stat-grid">${t}</div>` +
      `<section class="panel"><h2>Top export products, 2024</h2>` +
      hbarChart(NUSANTARA.topExports2024, { unit: "bn" }) +
      `<p class="caption">Export value in US$ billion (approximate, rounded). Coal and palm oil remain the ` +
      `largest earners; iron and steel — mostly processed nickel and stainless steel — has grown fast ` +
      `as downstream processing expands.</p>` +
      sourceNote("BPS — Statistics Indonesia, 2024.") + `</section>`;
  }
  return pageHead("Economy", "A US$1.4 trillion economy",
      "Indonesia is the largest economy in Southeast Asia and the world's 16th largest by nominal GDP. " +
      "Growth has held above 5% since 2022, driven by domestic consumption.") +
    `<div class="tab-bar" role="tablist">${tabs}</div>${body}`;
}

/* ---------- Prices ---------- */

function viewPrices() {
  return pageHead("Prices & Inflation", "Inflation back under 2%",
      "Consumer price inflation fell to 1.57% in December 2024, the lowest in years, after the " +
      "2022 spike when subsidised fuel prices were raised. Bank Indonesia targets 2.5% ± 1 point.") +
    `<div class="stat-grid">` +
    statCard("Inflation, Dec 2024", "1.57%", "Year on year, BPS") +
    statCard("Inflation target", "2.5% ± 1pp", "Bank Indonesia, 2024–2026") +
    statCard("Policy rate", "6.00%", "BI-Rate, end of 2024") +
    statCard("Food inflation, 2024", "3.14%", "Food, beverages & tobacco") +
    `</div>` +
    `<section class="panel"><h2>Inflation, 2019–2024</h2>` +
    barChart(NUSANTARA.inflationSeries.map(p => ({ label: String(p.year), value: p.value })),
      { unit: "%", color: "#d98e1f", highlightLast: true }) +
    `<p class="caption">Consumer price inflation, % year on year in December. The 2022 jump followed the ` +
    `September fuel-subsidy adjustment; prices settled through 2023 and 2024.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2019–2024.") + `</section>` +
    `<section class="panel"><h2>Price rises by group, 2024</h2>` +
    hbarChart(NUSANTARA.inflationByGroup2024.map(g => ({ label: g.group, value: g.change })), { unit: "%" }) +
    `<p class="caption">Year-on-year change in the consumer price index by expenditure group, December 2024. ` +
    `Personal care rose fastest; transport barely moved as fuel prices stayed put.</p>` +
    sourceNote("BPS — Statistics Indonesia, December 2024.") + `</section>`;
}

/* ---------- Employment ---------- */

function viewEmployment() {
  const cards = NUSANTARA.labour2024.map(x => statCard(x.label, x.value, x.note)).join("");
  return pageHead("Employment", "144.6 million people at work",
      "The labour force reached 152.1 million in August 2024 and unemployment fell to 4.91%, " +
      "its lowest since before the pandemic. Most workers are still in informal jobs.") +
    `<div class="stat-grid">${cards}</div>` +
    `<div class="two-col">` +
    `<section class="panel"><h2>Unemployment, 2019–2024</h2>` +
    lineChart(NUSANTARA.unemploymentSeries.map(p => ({ label: String(p.year), value: p.value })),
      { unit: "%", color: "#0e6b5c" }) +
    `<p class="caption">Open unemployment rate, % of the labour force, August round. The 2020 spike is the ` +
    `pandemic; the rate has fallen every year since.</p>` +
    sourceNote("BPS — Statistics Indonesia, National Labour Force Survey, 2019–2024.") + `</section>` +
    `<section class="panel"><h2>Where people work, 2024</h2>` +
    hbarChart(NUSANTARA.employmentBySector2024, { unit: "%" }) +
    `<p class="caption">Share of employed people by sector. Agriculture still employs the most workers of any ` +
    `single sector, even though it produces only about an eighth of GDP.</p>` +
    sourceNote("BPS — Statistics Indonesia, August 2024.") + `</section></div>` +
    `<section class="panel"><h2>Young workers</h2><p>Youth unemployment (ages 15–24) stood at 16.0% in August 2024 — ` +
    `more than three times the overall rate. About 1 in 5 young people were not in employment, education or ` +
    `training. Provincial minimum wages for 2025 range from about Rp 2.0 million a month in Central Java to ` +
    `about Rp 5.6 million in Jakarta.</p>` +
    sourceNote("BPS — Statistics Indonesia, August 2024; provincial minimum-wage decrees, 2025.") + `</section>`;
}

/* ---------- Poverty ---------- */

function viewPoverty() {
  const cards = NUSANTARA.poverty2024.map(x => statCard(x.label, x.value, x.note)).join("");
  return pageHead("Poverty & Welfare", "Poverty at its lowest on record",
      "The poverty rate fell to 8.57% in September 2024 — the lowest since records began — as food prices " +
      "eased and social assistance reached more households. Rural poverty remains well above urban poverty.") +
    `<div class="stat-grid">${cards}</div>` +
    `<section class="panel"><h2>Poverty rate, 2019–2024</h2>` +
    lineChart(NUSANTARA.povertySeries.map(p => ({ label: String(p.year), value: p.value })),
      { unit: "%", color: "#0e6b5c" }) +
    `<p class="caption">Share of the population below the national poverty line, % — September round. ` +
    `The pandemic pushed the rate up in 2020; it has fallen every year since 2021.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2019–2024.") + `</section>` +
    `<section class="panel"><h2>How the numbers are read</h2><p>The poverty line is what BPS estimates a person needs ` +
    `each month for a minimum basket of food and non-food items: Rp 595,242 in September 2024. The Gini ratio, ` +
    `a measure of inequality from 0 (perfectly equal) to 1, was 0.379 — little changed in five years. The Human ` +
    `Development Index, combining health, schooling and income, reached 75.02 in 2024, in the "high" band, ` +
    `with life expectancy at 74.15 years and expected schooling at 13.3 years.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2024.") + `</section>`;
}

/* ---------- Regions ---------- */

function shortProvinceName(name) {
  const short = {
    "West Java": "W. Java", "East Java": "E. Java", "Central Java": "C. Java",
    "North Sumatra": "N. Sumatra", "South Sulawesi": "S. Sulawesi",
    "South Sumatra": "S. Sumatra", "West Sumatra": "W. Sumatra",
    "West Kalimantan": "W. Kalimantan", "Central Kalimantan": "C. Kalimantan",
    "East Kalimantan": "E. Kalimantan", "South Kalimantan": "S. Kalimantan",
    "North Kalimantan": "N. Kalimantan", "North Sulawesi": "N. Sulawesi",
    "Central Sulawesi": "C. Sulawesi", "Southeast Sulawesi": "SE Sulawesi",
    "West Nusa Tenggara": "W. Nusa Tenggara", "East Nusa Tenggara": "E. Nusa Tenggara",
    "West Sulawesi": "W. Sulawesi", "North Maluku": "N. Maluku",
    "West Papua": "W. Papua", "Southwest Papua": "SW Papua",
    "Central Papua": "C. Papua", "Highland Papua": "Highland Papua",
    "South Papua": "S. Papua", "Bangka Belitung": "Bangka Belitung",
    "Riau Islands": "Riau Islands"
  };
  return short[name] || name;
}

function regionRow(p) {
  const density = Math.round((p.pop * 1e6) / p.area);
  return `<tr><td><a href="#/regions/${encodeURIComponent(p.name)}">${esc(p.name)}</a></td>` +
    `<td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.area.toLocaleString("en-US")}</td>` +
    `<td class="num">${density.toLocaleString("en-US")}</td><td>${esc(p.capital)}</td></tr>`;
}

function viewRegions(query, sort, selected) {
  const q = (query || "").trim().toLowerCase();
  let list = NUSANTARA.provinces.filter(p =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const key = sort || "pop";
  list = list.slice().sort((a, b) => {
    if (key === "name") return a.name.localeCompare(b.name);
    if (key === "area") return b.area - a.area;
    if (key === "density") return (b.pop / b.area) - (a.pop / a.area);
    return b.pop - a.pop;
  });
  const rows = list.map(regionRow).join("") ||
    `<tr><td colspan="5">No province matches “${esc(query)}”. Try another name.</td></tr>`;
  const sortOpts = [["pop", "Largest population"], ["area", "Largest area"],
    ["density", "Highest density"], ["name", "Name A–Z"]]
    .map(([v, l]) => `<option value="${v}"${key === v ? " selected" : ""}>${l}</option>`).join("");
  let detail = "";
  if (selected) {
    const p = NUSANTARA.provinces.find(x => x.name === selected);
    if (p) {
      const density = Math.round((p.pop * 1e6) / p.area);
      const rank = NUSANTARA.provinces.slice().sort((a, b) => b.pop - a.pop).indexOf(p) + 1;
      detail = `<section class="panel detail-card"><h2>${esc(p.name)}</h2>` +
        `<div class="stat-grid">` +
        statCard("Population, 2024", p.pop.toFixed(2) + " million", "Rank #" + rank + " of 38 provinces") +
        statCard("Land area", p.area.toLocaleString("en-US") + " km²", "BPS, 2024") +
        statCard("Density", density.toLocaleString("en-US") + " / km²", "People per km²") +
        statCard("Capital", esc(p.capital), "Provincial capital") +
        `</div><p class="caption">${esc(p.name)} holds about ` +
        `${(p.pop / 281.6 * 100).toFixed(1)}% of Indonesia's population.</p></section>`;
    }
  }
  const top10 = NUSANTARA.provinces.slice().sort((a, b) => b.pop - a.pop).slice(0, 10);
  return pageHead("Provinces & Regions", "All 38 provinces, compared",
      "Indonesia has 38 provinces, from Aceh in the west to South Papua in the east. " +
      "Search the table, sort it, or pick a province to see its figures.") +
    `<div class="toolbar"><label for="prov-search">Search</label>` +
    `<input id="prov-search" type="search" data-control="search" placeholder="Province or capital…" value="${esc(query || "")}">` +
    `<label for="prov-sort">Sort by</label>` +
    `<select id="prov-sort" data-control="sort">${sortOpts}</select></div>` +
    detail +
    `<section class="panel"><h2>Largest provinces by population</h2>` +
    barChart(top10.map(p => ({ label: shortProvinceName(p.name), value: p.pop })),
      { unit: "m", highlightLast: false }) +
    `<p class="caption">Population in millions, 2024. West Java alone has more people than most countries.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2024 mid-year estimates.") + `</section>` +
    `<section class="panel"><h2>Province table <span class="muted">(${list.length} shown)</span></h2>` +
    `<div class="table-scroll"><table class="data-table"><thead><tr>` +
    `<th>Province</th><th class="num">Population (m)</th><th class="num">Area (km²)</th>` +
    `<th class="num">Density (/km²)</th><th>Capital</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    `<p class="caption">Populations are BPS 2024 mid-year estimates, rounded. Density is computed from the ` +
    `figures shown.</p>` +
    sourceNote("BPS — Statistics Indonesia, 2024.") + `</section>`;
}

/* ---------- Sources ---------- */

function viewSources() {
  const rows = NUSANTARA.sources.map(s =>
    `<tr><th scope="row">${esc(s.publisher)}</th><td>${esc(s.what)}</td>` +
    `<td>${esc(s.year)}</td><td>${esc(s.note)}</td></tr>`).join("");
  const methods = NUSANTARA.methods.map(m => `<li>${esc(m)}</li>`).join("");
  return pageHead("Sources & Methods", "Where every number comes from",
      "Every figure on this site names its publisher and year on the page where it appears. " +
      "This page gathers the sources and explains how the figures are defined.") +
    `<section class="panel"><h2>Sources</h2><div class="table-scroll">` +
    `<table class="data-table"><thead><tr><th>Publisher</th><th>What it provides</th>` +
    `<th>Years</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div></section>` +
    `<section class="panel"><h2>Methods &amp; definitions</h2><ol class="method-list">${methods}</ol></section>` +
    `<section class="panel"><h2>About this site</h2><p>Statistik Nusantara is an independent presentation of ` +
    `public statistics, built to make Indonesia's headline numbers easy to find and check. It is not ` +
    `affiliated with BPS or any government body. All design, text and charts are original; no text, logo or ` +
    `image is reused from any official publication. Figures were last reviewed in November 2026.</p></section>`;
}
