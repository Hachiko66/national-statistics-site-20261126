/* Statistik Nusantara — figures for Indonesia.
   Every number below is a published figure from BPS (Statistics Indonesia),
   the World Bank, Bank Indonesia or APJII, for the year stated next to it.
   Values are rounded for display; the source note on each page names the
   publisher and the year. Province populations are BPS mid-year estimates. */

const NUSANTARA = {
  country: "Indonesia",
  updated: "November 2026",
  years: [2022, 2023, 2024],

  /* Headline indicators, one row per year, for the year selector. */
  headline: {
    2022: {
      population: 275.8, populationUnit: "million",
      gdp: 19588, gdpUnit: "Rp trillion",
      gdpGrowth: 5.31, gdpPerCapita: 4784,
      inflation: 5.51, unemployment: 5.86, poverty: 9.57,
      hdi: 73.86, lifeExpectancy: 73.73, gini: 0.381
    },
    2023: {
      population: 278.7, populationUnit: "million",
      gdp: 20892, gdpUnit: "Rp trillion",
      gdpGrowth: 5.05, gdpPerCapita: 4925,
      inflation: 2.61, unemployment: 5.45, poverty: 9.36,
      hdi: 74.39, lifeExpectancy: 73.93, gini: 0.379
    },
    2024: {
      population: 281.6, populationUnit: "million",
      gdp: 22139, gdpUnit: "Rp trillion",
      gdpGrowth: 5.03, gdpPerCapita: 4960,
      inflation: 1.57, unemployment: 4.91, poverty: 8.57,
      hdi: 75.02, lifeExpectancy: 74.15, gini: 0.379
    }
  },

  facts: [
    { label: "Land area", value: "1,904,569 km²", note: "BPS, 2024" },
    { label: "Islands", value: "17,508", note: "BPS, 2024" },
    { label: "Provinces", value: "38", note: "BPS, 2024" },
    { label: "Capital", value: "Jakarta", note: "Moving to Nusantara (IKN)" },
    { label: "Currency", value: "Rupiah (IDR)", note: "Bank Indonesia, 2024" },
    { label: "Median age", value: "30.4 years", note: "UN World Population Prospects, 2024" },
    { label: "Urban share", value: "58.6%", note: "World Bank, 2023" },
    { label: "Internet users", value: "221.6 million", note: "APJII, 2024" }
  ],

  /* Population, millions, BPS mid-year estimates. 2020 is the census count. */
  populationSeries: [
    { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
    { year: 2021, value: 272.2 }, { year: 2022, value: 275.8 },
    { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 }
  ],

  ageStructure2024: [
    { group: "0–14 years", share: 24.5 },
    { group: "15–64 years", share: 68.9 },
    { group: "65+ years", share: 6.6 }
  ],

  densityNote: "Java holds about 56% of the population on about 7% of the land. " +
    "Jakarta is the densest province at roughly 16,000 people per km²; " +
    "North Kalimantan is the least dense at about 10 per km².",

  /* Real GDP growth, % year on year, BPS. */
  gdpGrowthSeries: [
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 }
  ],

  gdpBySector2024: [
    { sector: "Manufacturing", share: 18.7 },
    { sector: "Wholesale & retail trade", share: 12.9 },
    { sector: "Agriculture, forestry & fishing", share: 12.5 },
    { sector: "Construction", share: 9.9 },
    { sector: "Mining & quarrying", share: 8.4 },
    { sector: "Financial & insurance", share: 4.2 },
    { sector: "Information & communication", share: 4.1 },
    { sector: "Transportation & storage", share: 4.0 },
    { sector: "Other services", share: 25.3 }
  ],

  trade2024: [
    { label: "Exports", value: 264.7, unit: "US$ billion" },
    { label: "Imports", value: 233.7, unit: "US$ billion" },
    { label: "Trade surplus", value: 31.0, unit: "US$ billion" },
    { label: "Foreign reserves (Dec)", value: 155.7, unit: "US$ billion" }
  ],

  topExports2024: [
    { product: "Mineral fuels, incl. coal", value: 47.9 },
    { product: "Iron & steel", value: 27.7 },
    { product: "Animal & vegetable fats (palm oil)", value: 24.4 },
    { product: "Electrical machinery", value: 13.3 },
    { product: "Vehicles & parts", value: 9.9 }
  ],

  /* Consumer price inflation, % year on year in December, BPS. */
  inflationSeries: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 }
  ],

  inflationByGroup2024: [
    { group: "Food, beverages & tobacco", change: 3.14 },
    { group: "Housing, water & energy", change: 1.63 },
    { group: "Transport", change: 0.58 },
    { group: "Health", change: 1.89 },
    { group: "Education", change: 1.72 },
    { group: "Personal care & other services", change: 5.52 }
  ],

  /* Open unemployment rate, %, BPS (August round). */
  unemploymentSeries: [
    { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
    { year: 2023, value: 5.45 }, { year: 2024, value: 4.91 }
  ],

  employmentBySector2024: [
    { sector: "Agriculture, forestry & fishing", share: 28.5 },
    { sector: "Wholesale & retail trade", share: 18.9 },
    { sector: "Manufacturing", share: 13.7 },
    { sector: "Construction", share: 8.1 },
    { sector: "Other services", share: 30.8 }
  ],

  labour2024: [
    { label: "Labour force", value: "152.1 million", note: "BPS, August 2024" },
    { label: "Employed", value: "144.6 million", note: "BPS, August 2024" },
    { label: "Unemployed", value: "7.5 million", note: "BPS, August 2024" },
    { label: "Informal workers", value: "57.9% of employed", note: "BPS, August 2024" },
    { label: "Youth unemployment (15–24)", value: "16.0%", note: "BPS, August 2024" },
    { label: "Minimum wage range", value: "Rp 2.0–5.6 million / month", note: "Provincial minimum wages, 2025" }
  ],

  /* Poverty rate, % of population, BPS (September round). */
  povertySeries: [
    { year: 2019, value: 9.22 }, { year: 2020, value: 9.78 },
    { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
    { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 }
  ],

  poverty2024: [
    { label: "People in poverty", value: "24.06 million", note: "BPS, September 2024" },
    { label: "Poverty line", value: "Rp 595,242 / person / month", note: "BPS, September 2024" },
    { label: "Urban poverty rate", value: "7.43%", note: "BPS, September 2024" },
    { label: "Rural poverty rate", value: "11.34%", note: "BPS, September 2024" },
    { label: "Gini ratio", value: "0.379", note: "BPS, September 2024" },
    { label: "Human Development Index", value: "75.02 (high)", note: "BPS, 2024" }
  ],

  /* Provinces: population in millions (BPS 2024 mid-year estimate, rounded),
     land area in km², capital city. */
  provinces: [
    { name: "Aceh", pop: 5.55, area: 57956, capital: "Banda Aceh" },
    { name: "North Sumatra", pop: 15.59, area: 72981, capital: "Medan" },
    { name: "West Sumatra", pop: 5.82, area: 42013, capital: "Padang" },
    { name: "Riau", pop: 6.91, area: 87024, capital: "Pekanbaru" },
    { name: "Jambi", pop: 3.68, area: 50058, capital: "Jambi City" },
    { name: "South Sumatra", pop: 8.94, area: 91592, capital: "Palembang" },
    { name: "Bengkulu", pop: 2.09, area: 19919, capital: "Bengkulu City" },
    { name: "Lampung", pop: 9.42, area: 34624, capital: "Bandar Lampung" },
    { name: "Bangka Belitung", pop: 1.52, area: 16424, capital: "Pangkal Pinang" },
    { name: "Riau Islands", pop: 2.24, area: 8202, capital: "Tanjung Pinang" },
    { name: "Jakarta", pop: 10.68, area: 664, capital: "Jakarta" },
    { name: "West Java", pop: 49.94, area: 35378, capital: "Bandung" },
    { name: "Central Java", pop: 37.89, area: 32801, capital: "Semarang" },
    { name: "Yogyakarta", pop: 3.76, area: 3133, capital: "Yogyakarta" },
    { name: "East Java", pop: 41.81, area: 47803, capital: "Surabaya" },
    { name: "Banten", pop: 12.43, area: 9663, capital: "Serang" },
    { name: "Bali", pop: 4.35, area: 5780, capital: "Denpasar" },
    { name: "West Nusa Tenggara", pop: 5.60, area: 18572, capital: "Mataram" },
    { name: "East Nusa Tenggara", pop: 5.66, area: 47932, capital: "Kupang" },
    { name: "West Kalimantan", pop: 5.83, area: 147307, capital: "Pontianak" },
    { name: "Central Kalimantan", pop: 2.80, area: 153564, capital: "Palangka Raya" },
    { name: "South Kalimantan", pop: 4.29, area: 38744, capital: "Banjarmasin" },
    { name: "East Kalimantan", pop: 3.93, area: 127347, capital: "Samarinda" },
    { name: "North Kalimantan", pop: 0.74, area: 75467, capital: "Tanjung Selor" },
    { name: "North Sulawesi", pop: 2.74, area: 13892, capital: "Manado" },
    { name: "Central Sulawesi", pop: 3.15, area: 61841, capital: "Palu" },
    { name: "South Sulawesi", pop: 9.48, area: 46717, capital: "Makassar" },
    { name: "Southeast Sulawesi", pop: 2.82, area: 38140, capital: "Kendari" },
    { name: "Gorontalo", pop: 1.27, area: 12435, capital: "Gorontalo City" },
    { name: "West Sulawesi", pop: 1.56, area: 16787, capital: "Mamuju" },
    { name: "Maluku", pop: 1.98, area: 46914, capital: "Ambon" },
    { name: "North Maluku", pop: 1.41, area: 31982, capital: "Sofifi" },
    { name: "West Papua", pop: 0.56, area: 60275, capital: "Manokwari" },
    { name: "Southwest Papua", pop: 0.62, area: 39067, capital: "Sorong" },
    { name: "Papua", pop: 1.08, area: 81937, capital: "Jayapura" },
    { name: "Central Papua", pop: 1.35, area: 61700, capital: "Nabire" },
    { name: "Highland Papua", pop: 1.47, area: 51886, capital: "Wamena" },
    { name: "South Papua", pop: 0.54, area: 117849, capital: "Merauke" }
  ],

  sources: [
    { publisher: "BPS — Statistics Indonesia", what: "Population estimates, GDP, inflation, unemployment, poverty, HDI and provincial figures", year: "2019–2024", note: "Official statistics releases and Statistical Yearbook of Indonesia." },
    { publisher: "World Bank", what: "GDP per capita, urban population share and development indicators", year: "2023–2024", note: "World Development Indicators." },
    { publisher: "Bank Indonesia", what: "Foreign exchange reserves and trade balance", year: "2024", note: "Official external-sector statistics." },
    { publisher: "APJII — Indonesian Internet Service Providers Association", what: "Internet users and penetration", year: "2024", note: "National internet penetration survey." },
    { publisher: "United Nations", what: "Median age", year: "2024", note: "World Population Prospects 2024." }
  ],

  methods: [
    "Figures are shown as published, rounded to the precision in the source release. Growth rates are year-on-year unless labelled otherwise.",
    "Population figures are BPS mid-year estimates; 2020 is the Population Census count. Provincial populations are rounded estimates and may not sum exactly to the national total.",
    "Inflation is the December year-on-year change in the Consumer Price Index. Unemployment is the August round of the National Labour Force Survey (Sakernas).",
    "The poverty line is the cost of a minimum basket of food and non-food needs per person per month, set by BPS.",
    "GDP by sector shares are shares of current-price GDP. Export values are free-on-board (FOB) in US dollars.",
    "This site is an independent presentation of public statistics. It is not affiliated with BPS or any government body, and it reuses no text, logo or image from any official publication."
  ]
};
