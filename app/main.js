/* Statistik Nusantara — router and control wiring.
   Hash routes: #/ (overview), #/population, #/economy, #/prices,
   #/employment, #/poverty, #/regions, #/regions/<Province>, #/sources.
   The economy page keeps its tab in the hash: #/economy/sectors. */

const ROUTES = [
  ["", "Overview"], ["population", "Population"], ["economy", "Economy"],
  ["prices", "Prices"], ["employment", "Employment"],
  ["poverty", "Poverty & Welfare"], ["regions", "Provinces"], ["sources", "Sources"]
];

const state = {
  year: 2024,
  regionQuery: "",
  regionSort: "pop",
  economyTab: "growth"
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").map(p => decodeURIComponent(p));
  return { page: parts[0] || "", arg: parts[1] || "" };
}

function render() {
  const r = currentRoute();
  const view = document.getElementById("view");
  const nav = document.getElementById("main-nav");
  let html = "";
  if (r.page === "population") html = viewPopulation();
  else if (r.page === "economy") {
    state.economyTab = ["growth", "sectors", "trade"].includes(r.arg) ? r.arg : state.economyTab;
    html = viewEconomy(state.economyTab);
  }
  else if (r.page === "prices") html = viewPrices();
  else if (r.page === "employment") html = viewEmployment();
  else if (r.page === "poverty") html = viewPoverty();
  else if (r.page === "regions") html = viewRegions(state.regionQuery, state.regionSort, r.arg || "");
  else if (r.page === "sources") html = viewSources();
  else html = viewOverview(state.year);
  view.innerHTML = html;
  nav.querySelectorAll("a").forEach(a => {
    const target = a.getAttribute("href").replace(/^#\/?/, "").split("/")[0];
    a.classList.toggle("active", target === r.page);
  });
  wireControls();
  window.scrollTo(0, 0);
}

/* Attach behaviour to the controls of the page just rendered. */
function wireControls() {
  const yearSel = document.querySelector('[data-control="year"]');
  if (yearSel) {
    yearSel.addEventListener("change", () => {
      state.year = parseInt(yearSel.value, 10) || 2024;
      render();
    });
  }
  document.querySelectorAll('[data-control="tab"]').forEach(btn => {
    btn.addEventListener("click", () => {
      state.economyTab = btn.getAttribute("data-tab");
      window.location.hash = "#/economy/" + state.economyTab;
      render();
    });
  });
  const search = document.querySelector('[data-control="search"]');
  if (search) {
    search.addEventListener("input", () => {
      state.regionQuery = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.querySelector('[data-control="search"]');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  const sort = document.querySelector('[data-control="sort"]');
  if (sort) {
    sort.addEventListener("change", () => {
      state.regionSort = sort.value;
      render();
    });
  }
}

window.addEventListener("hashchange", render);
document.addEventListener("DOMContentLoaded", render);
