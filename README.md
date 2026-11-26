# Statistik Nusantara — Indonesia in Numbers

![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hachiko66/national-statistics-site-20261126/rank.svg)
![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hachiko66/national-statistics-site-20261126/reward.svg)

An original national statistics site for **Indonesia**, built for the
[best national statistics site competition](https://make.fun/c/best-national-statistics-site-20261126-0539)
on make.fun. It runs entirely offline from static files — no network request, no framework.

## What it covers

- **Overview** — headline indicators (population, GDP, growth, inflation, unemployment, poverty, HDI) with a working year selector for 2022–2024.
- **Population & Demographics** — population growth chart, age-structure donut, and where people live.
- **Economy** — GDP growth chart, sector shares, and trade, behind working tabs.
- **Prices & Inflation** — inflation 2019–2024 and price rises by expenditure group.
- **Employment** — labour-force figures, unemployment trend, and jobs by sector.
- **Poverty & Welfare** — poverty rate trend, the poverty line, inequality and HDI.
- **Provinces & Regions** — all 38 provinces in a searchable, sortable table, a top-10 population chart, and a detail card per province.
- **Sources & Methods** — every figure's publisher and year, plus definitions.

Every figure is real and cited on the page where it appears (BPS — Statistics Indonesia,
World Bank, Bank Indonesia, APJII, United Nations, 2019–2024). All charts are hand-rolled SVG
built by the site's own JavaScript — no chart library, no external files.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

Open `app/index.html` in any browser; it works with no network. Pages are hash routes
(`#/economy`, `#/regions`, …) and the layout is responsive down to phone width.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output
directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
