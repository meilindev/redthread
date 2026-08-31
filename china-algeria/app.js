(function(){
  "use strict";

  const YEARS = APP_DATA.years;                    // [1998 ... 2024]
  const COUNTRIES = APP_DATA.countries;             // [Algeria, Egypt, Morocco, Tunisia, Libya]
  const COLOR = APP_DATA.countryColor;
  const SUBJECT = "Algeria";                        // this site is an Algeria dashboard with regional context,
                                                     // not a switchable multi-country tool — cross-country work
                                                     // lives entirely in the Compare tab.

  function fmt(v, decimals) {
    if (v === null || v === undefined || Number.isNaN(v)) return "—";
    const d = decimals === undefined ? (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 1 ? 1 : 2) : decimals;
    return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function fmtUSDmn(v) {
    if (v === null || v === undefined) return "—";
    if (Math.abs(v) >= 1000) return "$" + fmt(v / 1000, 2) + "B";
    return "$" + fmt(v, 0) + "M";
  }

  function fmtUSD(v) {
    if (v === null || v === undefined) return "—";
    if (Math.abs(v) >= 1e9) return "$" + fmt(v / 1e9, 2) + "B";
    if (Math.abs(v) >= 1e6) return "$" + fmt(v / 1e6, 1) + "M";
    return "$" + fmt(v, 0);
  }

  // ---------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------
  function initTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        document.querySelectorAll(".panel-view").forEach(p => p.classList.remove("active"));
        document.getElementById("view-" + btn.dataset.tab).classList.add("active");
        Object.values(charts).forEach(c => c && c.resize && c.resize());
      });
    });
  }

  // ---------------------------------------------------------------
  // Chart helpers
  // ---------------------------------------------------------------
  const CHARTS_AVAILABLE = typeof Chart !== "undefined";

  if (CHARTS_AVAILABLE) {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#8892a0";
    Chart.defaults.borderColor = "#2a3038";
  } else {
    document.querySelectorAll(".chart-wrap").forEach(wrap => {
      wrap.innerHTML = '<div class="chart-unavailable">Chart unavailable — Chart.js didn’t load.<br>See the notice above.</div>';
    });
  }

  function baseOptions(extra) {
    return Object.assign({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { boxWidth: 10, boxHeight: 10, padding: 14, font: { size: 11 } } },
        tooltip: {
          backgroundColor: "#1f242c",
          borderColor: "#2a3038",
          borderWidth: 1,
          titleFont: { family: "'IBM Plex Mono', monospace", size: 11 },
          bodyFont: { family: "'IBM Plex Mono', monospace", size: 11 },
          padding: 10
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 10.5 } } },
        y: { grid: { color: "#232830" }, ticks: { font: { size: 10.5 } } }
      }
    }, extra || {});
  }

  const charts = {};

  function makeChart(canvasId, type, data, opts, plugins) {
    if (!CHARTS_AVAILABLE) return null;
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    if (charts[canvasId]) { charts[canvasId].destroy(); }
    charts[canvasId] = new Chart(ctx, { type, data, options: baseOptions(opts), plugins: plugins || [] });
    return charts[canvasId];
  }

  function countrySeries(c, extra) {
    const isSubject = c === SUBJECT;
    return Object.assign({
      label: c,
      data: APP_DATA.contractRevenue[c],
      borderColor: COLOR[c],
      backgroundColor: COLOR[c] + "22",
      borderWidth: isSubject ? 3 : 1.5,
      pointRadius: 0,
      tension: 0.15,
      order: isSubject ? 0 : 1
    }, extra || {});
  }

  // Marks each flagship project's start year on the Overview revenue chart,
  // so the spikes/dips in the line connect to an actual cause instead of
  // floating unexplained. Same technique as a forecast pivot-line, repurposed
  // for real events instead of a model boundary.
  const PROJECT_SHORT_LABEL = { mosque: "Mosque", highway: "Highway", airport: "Airport", port: "Port" };

  function projectMarkersPlugin() {
    return {
      id: "projectMarkers",
      afterDraw(chart) {
        const xScale = chart.scales.x;
        if (!xScale) return;
        const { top, bottom } = chart.chartArea;
        const ctx = chart.ctx;
        const sorted = APP_DATA.flagshipProjects.slice().sort((a, b) => a.yearStart - b.yearStart);
        sorted.forEach((p, i) => {
          const idx = YEARS.indexOf(p.yearStart);
          if (idx < 0) return;
          const x = xScale.getPixelForValue(idx);
          const color = p.status === "cancelled" ? "#e0607a" : "#ff6a3d";
          ctx.save();
          ctx.strokeStyle = color + "77";
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(x, top);
          ctx.lineTo(x, bottom);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = color;
          ctx.font = "9.5px 'IBM Plex Mono', monospace";
          ctx.textAlign = "left";
          ctx.save();
          ctx.translate(x + 3, top + 9 + (i % 2) * 12);
          ctx.fillText(PROJECT_SHORT_LABEL[p.id] || p.id, 0, 0);
          ctx.restore();
          ctx.restore();
        });
      }
    };
  }

  // ---------------------------------------------------------------
  // Overview: snapshot + KPIs (always about Algeria — the site's subject)
  // ---------------------------------------------------------------
  function renderKpis(yearIndex) {
    const grid = document.getElementById("kpiGrid");
    const rev = APP_DATA.contractRevenue[SUBJECT][yearIndex];
    const prevRev = yearIndex > 0 ? APP_DATA.contractRevenue[SUBJECT][yearIndex - 1] : null;
    const yoy = prevRev ? ((rev - prevRev) / prevRev) * 100 : null;
    const cum = APP_DATA.cumulativeRevenue[SUBJECT][yearIndex];
    const rank = APP_DATA.rankByCountry[SUBJECT][yearIndex];
    const totalCountries = APP_DATA.africaCountryCount[yearIndex];
    const share = APP_DATA.shareByCountry[SUBJECT][yearIndex];

    const cards = [
      { label: "Algeria contract revenue", value: fmtUSDmn(rev) },
      { label: "Year-over-year change", value: (yoy === null ? "—" : (yoy >= 0 ? "+" : "") + fmt(yoy, 1) + "%") },
      { label: `Cumulative since ${YEARS[0]}`, value: fmtUSDmn(cum) },
      { label: "Rank in Africa", value: rank ? `#${rank} of ${totalCountries}` : "—" },
      { label: "Share of Africa total", value: fmt(share, 1) + "%" }
    ];
    grid.innerHTML = cards.map(k => `<div class="kpi-card">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
    </div>`).join("");
  }

  function initSnapshot() {
    const slider = document.getElementById("snapshotYear");
    const yearLabel = document.getElementById("snapshotYearLabel");
    const hint = document.getElementById("snapshotHint");
    function update() {
      const year = parseInt(slider.value, 10);
      const idx = YEARS.indexOf(year);
      yearLabel.textContent = year;
      hint.textContent = year === YEARS[YEARS.length - 1] ? "Latest available" : "Historical";
      renderKpis(idx);
    }
    slider.addEventListener("input", update);
    update();
  }

  function renderOverview() {
    makeChart("chartRevenue", "line", {
      labels: YEARS,
      datasets: COUNTRIES.slice().sort((a, b) => (a === SUBJECT ? 1 : 0) - (b === SUBJECT ? 1 : 0)).map(c => countrySeries(c))
    }, {}, [projectMarkersPlugin()]);

    makeChart("chartShare", "line", {
      labels: YEARS,
      datasets: [{
        label: SUBJECT + " share of Africa total",
        data: APP_DATA.shareByCountry[SUBJECT],
        borderColor: COLOR[SUBJECT],
        backgroundColor: COLOR[SUBJECT] + "33",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.15
      }]
    }, {
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 10.5 } } },
        y: { grid: { color: "#232830" }, ticks: { font: { size: 10.5 }, callback: v => v + "%" } }
      }
    });
  }

  // ---------------------------------------------------------------
  // Flagship projects
  // ---------------------------------------------------------------
  function renderProjects() {
    const projects = APP_DATA.flagshipProjects;

    // Timeline (start→end year) rather than a value bar chart — the value is
    // already on each card below, so this adds new information: sequencing
    // and overlap between projects, on the same year axis as the Overview tab.
    makeChart("chartProjects", "bar", {
      labels: projects.map(p => p.name.split(" (")[0]),
      datasets: [{
        label: "Active years",
        data: projects.map(p => [p.yearStart, p.yearEnd]),
        backgroundColor: projects.map(p => p.status === "cancelled" ? "#e0607a99" : "#ff6a3d99"),
        borderRadius: 4,
        barThickness: 22
      }]
    }, {
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => {
          const p = projects[ctx.dataIndex];
          return `${p.yearStart}–${p.yearEnd} · ${p.statusLabel}`;
        } } }
      },
      scales: {
        x: { min: YEARS[0], max: YEARS[YEARS.length - 1], grid: { color: "#232830" }, ticks: { font: { size: 10.5 }, callback: v => Math.round(v) } },
        y: { grid: { display: false }, ticks: { font: { size: 11.5 } } }
      }
    });

    const list = document.getElementById("projectList");
    list.innerHTML = projects.map(p => `
      <div class="project-card">
        <div class="project-head">
          <div>
            <h3>${p.name}</h3>
            <div class="project-meta">
              <span class="status-badge status-${p.status}">${p.statusLabel}</span>
              <span>${p.sector}</span>
              <span>${p.yearStart}–${p.yearEnd}</span>
            </div>
          </div>
          <div class="project-value">
            <strong>${p.valueUSD ? fmtUSD(p.valueUSD) : "n/a"}</strong>
            <span>${p.valueNote}</span>
          </div>
        </div>
        <p class="project-desc">${p.description}</p>
        <p class="project-meta" style="margin-bottom:8px;">Contractor: ${p.contractor} &middot; Financier: ${p.financier}</p>
        <div class="project-sources">
          ${p.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.title} ↗</a>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // ---------------------------------------------------------------
  // Official financing (AidData)
  // ---------------------------------------------------------------
  const FIN_PALETTE = ["#ff6a3d", "#4a90d9", "#3fb68a", "#e8a33d", "#b07cd9", "#e0607a", "#6ad1c9", "#9aa5b8"];

  function renderFinancing() {
    const f = APP_DATA.financing;
    const grid = document.getElementById("financingKpi");
    grid.innerHTML = `
      <div class="kpi-card"><div class="kpi-label">Tracked records, 2000–2021</div><div class="kpi-value">${f.totalRecords}</div></div>
      <div class="kpi-card"><div class="kpi-label">Aggregable total value</div><div class="kpi-value">${fmtUSD(f.recommendedTotalUSD)}</div></div>
      <div class="kpi-card"><div class="kpi-label">Grants, by value</div><div class="kpi-value">${fmtUSD(f.grantValueUSD)}</div></div>
      <div class="kpi-card"><div class="kpi-label">Loans, by value</div><div class="kpi-value">${fmtUSD(f.loanValueUSD)}</div></div>
    `;

    const sectorEntries = Object.entries(f.bySector).sort((a, b) => b[1] - a[1]);
    makeChart("chartFinSector", "bar", {
      labels: sectorEntries.map(([k]) => k.replace(/,.*/, "").toLowerCase().replace(/^\w/, c => c.toUpperCase())),
      datasets: [{ data: sectorEntries.map(([, v]) => v), backgroundColor: FIN_PALETTE[0], borderRadius: 4 }]
    }, {
      indexAxis: "y",
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmtUSD(ctx.parsed.x) } } },
      scales: {
        x: { grid: { color: "#232830" }, ticks: { font: { size: 10 }, callback: v => fmtUSD(v) } },
        y: { grid: { display: false }, ticks: { font: { size: 10.5 } } }
      }
    });

    // By value, not by record count — count is dominated by many $0 symbolic
    // entries (vaccine batches, medical-team dispatches), which would make
    // grants look ~6x more dominant than the money actually shows.
    makeChart("chartFinFlow", "bar", {
      labels: ["Grants", "Loans"],
      datasets: [{
        data: [f.grantValueUSD, f.loanValueUSD],
        backgroundColor: [FIN_PALETTE[0], FIN_PALETTE[1]],
        borderRadius: 4,
        barThickness: 40
      }]
    }, {
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmtUSD(ctx.parsed.y) } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: { grid: { color: "#232830" }, ticks: { font: { size: 10.5 }, callback: v => fmtUSD(v) } }
      }
    });
  }

  // ---------------------------------------------------------------
  // Compare tab — the site's one genuinely cross-country view
  // ---------------------------------------------------------------
  const COMPARE_METRICS = [
    { key: "revenue", name: "Contract revenue (US$M)", get: c => APP_DATA.contractRevenue[c], unit: "US$M" },
    { key: "cumulative", name: "Cumulative revenue since 1998 (US$M)", get: c => APP_DATA.cumulativeRevenue[c], unit: "US$M" },
    { key: "share", name: "Share of Africa total (%)", get: c => APP_DATA.shareByCountry[c], unit: "%" },
    { key: "rank", name: "Rank in Africa (1 = highest)", get: c => APP_DATA.rankByCountry[c], unit: "rank" }
  ];

  function initCompare() {
    const sel = document.getElementById("compareMetric");
    sel.innerHTML = COMPARE_METRICS.map(m => `<option value="${m.key}">${m.name}</option>`).join("");
    sel.addEventListener("change", renderCompare);
    renderCompare();
  }

  function renderCompare() {
    const key = document.getElementById("compareMetric").value || COMPARE_METRICS[0].key;
    const meta = COMPARE_METRICS.find(m => m.key === key) || COMPARE_METRICS[0];
    document.getElementById("compareTitle").textContent = meta.name;
    document.getElementById("compareSub").textContent = `Unit: ${meta.unit}`;

    makeChart("chartCompare", "line", {
      labels: YEARS,
      datasets: COUNTRIES.map(c => ({
        label: c,
        data: meta.get(c),
        borderColor: COLOR[c],
        backgroundColor: COLOR[c] + "22",
        borderWidth: c === SUBJECT ? 3 : 1.5,
        pointRadius: 0,
        tension: 0.15,
        yAxisID: "y"
      }))
    }, meta.key === "rank" ? { scales: { y: { reverse: true, grid: { color: "#232830" } } } } : {});

    const table = document.getElementById("compareTable");
    const showYears = YEARS.filter(y => y % 3 === 0 || y === YEARS[YEARS.length - 1]);
    let thead = "<thead><tr><th>Country</th>" + showYears.map(y => `<th>${y}</th>`).join("") + "</tr></thead>";
    let tbody = "<tbody>" + COUNTRIES.map(c => {
      const v = meta.get(c);
      return `<tr><td>${c}</td>` +
        showYears.map(y => `<td>${meta.key === "rank" ? "#" + v[YEARS.indexOf(y)] : fmt(v[YEARS.indexOf(y)])}</td>`).join("") + "</tr>";
    }).join("") + "</tbody>";
    table.innerHTML = thead + tbody;
  }

  // ---------------------------------------------------------------
  // Explore tab
  // ---------------------------------------------------------------
  function revenueRows() {
    return YEARS.map((y, i) => ({
      year: y,
      Algeria: APP_DATA.contractRevenue.Algeria[i],
      Egypt: APP_DATA.contractRevenue.Egypt[i],
      Morocco: APP_DATA.contractRevenue.Morocco[i],
      Tunisia: APP_DATA.contractRevenue.Tunisia[i],
      Libya: APP_DATA.contractRevenue.Libya[i],
      africaTotal: APP_DATA.africaTotal[i],
      algeriaRank: APP_DATA.algeriaRank[i]
    }));
  }

  function renderExplore(filterText) {
    const dataset = document.getElementById("exploreDataset").value;
    const table = document.getElementById("exploreTable");
    const term = (filterText || "").toLowerCase();

    if (dataset === "revenue") {
      const rows = revenueRows().filter(r => !term || String(r.year).includes(term));
      table.innerHTML =
        "<thead><tr><th>Year</th><th>Algeria</th><th>Egypt</th><th>Morocco</th><th>Tunisia</th><th>Libya</th><th>Africa total</th><th>Algeria rank</th></tr></thead>" +
        "<tbody>" + rows.map(r => `<tr>
          <td>${r.year}</td><td>${fmt(r.Algeria)}</td><td>${fmt(r.Egypt)}</td><td>${fmt(r.Morocco)}</td>
          <td>${fmt(r.Tunisia)}</td><td>${fmt(r.Libya)}</td><td>${fmt(r.africaTotal)}</td><td>#${r.algeriaRank}</td>
        </tr>`).join("") + "</tbody>";
    } else {
      const rows = APP_DATA.financing.projects.filter(p => {
        if (!term) return true;
        return (p.title + " " + p.sector + " " + p.flowType + " " + p.status).toLowerCase().includes(term);
      });
      table.innerHTML =
        "<thead><tr><th>Year</th><th>Title</th><th>Sector</th><th>Flow type</th><th>Status</th><th>Amount (US$, 2021)</th></tr></thead>" +
        "<tbody>" + rows.map(p => `<tr>
          <td>${p.year || "—"}</td>
          <td class="label-cell">${p.title}</td>
          <td class="unit-cell">${p.sector}</td>
          <td>${p.flowType}</td>
          <td>${p.status}</td>
          <td>${fmtUSD(p.amountUSD)}</td>
        </tr>`).join("") + "</tbody>";
    }
  }

  const EXPLORE_PLACEHOLDER = {
    revenue: "Search by year… e.g. 2016",
    aiddata: "Search… e.g. “vaccine”, “loan”, “health”"
  };

  function initExplore() {
    const search = document.getElementById("exploreSearch");
    const datasetSel = document.getElementById("exploreDataset");
    search.addEventListener("input", () => renderExplore(search.value));
    datasetSel.addEventListener("change", () => {
      search.value = "";
      search.placeholder = EXPLORE_PLACEHOLDER[datasetSel.value] || "";
      renderExplore("");
    });
    document.getElementById("exploreCsv").addEventListener("click", () => downloadCsv(search.value));
    renderExplore("");
  }

  function downloadCsv(filterText) {
    const dataset = document.getElementById("exploreDataset").value;
    let header, lines;
    if (dataset === "revenue") {
      const term = (filterText || "").toLowerCase();
      const rows = revenueRows().filter(r => !term || String(r.year).includes(term));
      header = ["Year", "Algeria", "Egypt", "Morocco", "Tunisia", "Libya", "Africa total", "Algeria rank"];
      lines = [header.join(",")].concat(rows.map(r =>
        [r.year, r.Algeria, r.Egypt, r.Morocco, r.Tunisia, r.Libya, r.africaTotal, r.algeriaRank].join(",")
      ));
    } else {
      const term = (filterText || "").toLowerCase();
      const rows = APP_DATA.financing.projects.filter(p => {
        if (!term) return true;
        return (p.title + " " + p.sector + " " + p.flowType + " " + p.status).toLowerCase().includes(term);
      });
      const csvField = s => `"${String(s).replace(/"/g, '""')}"`;
      header = ["Year", "Title", "Sector", "Flow type", "Status", "Amount (US$, 2021)"];
      lines = [header.join(",")].concat(rows.map(p =>
        [p.year || "", csvField(p.title), csvField(p.sector), csvField(p.flowType), csvField(p.status), p.amountUSD].join(",")
      ));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `china-algeria-${dataset}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---------------------------------------------------------------
  // Orchestration
  // ---------------------------------------------------------------
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error(`[china-algeria] ${label} failed:`, e); }
  }

  function renderAll() {
    safe(() => {
      const idx = YEARS.indexOf(parseInt(document.getElementById("snapshotYear").value, 10));
      renderKpis(idx);
    }, "renderKpis");
    safe(renderOverview, "renderOverview");
    safe(renderProjects, "renderProjects");
    safe(renderFinancing, "renderFinancing");
    safe(renderCompare, "renderCompare");
    safe(() => renderExplore(document.getElementById("exploreSearch").value), "renderExplore");
  }

  function init() {
    safe(initTabs, "initTabs");
    safe(initSnapshot, "initSnapshot");
    safe(initCompare, "initCompare");
    safe(initExplore, "initExplore");
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
