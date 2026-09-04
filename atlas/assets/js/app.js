/* ============================================================
   The Fifty-Six — application
   ============================================================ */
(function () {
  "use strict";

  var PEOPLES = window.PEOPLES || [];
  var ZONES   = window.ZONES   || {};
  var GEO     = window.GEO     || [];
  var ROUTES  = window.ROUTES  || [];
  var PROV    = window.PROVINCES || [];
  var AUTO    = window.AUTONOMOUS || [];
  var INDUSTRY = window.INDUSTRY || [];
  var DWELL    = window.DWELLING_TYPES || {};
  var SECTORS  = window.SECTORS  || {};

  var FAMILIES = {
    turkic:    { label: "Turkic",                       color: "#4c6a68" },
    mongolic:  { label: "Mongolic",                     color: "#a4502c" },
    tungusic:  { label: "Tungusic",                     color: "#3d4a5c" },
    tibeto:    { label: "Tibeto-Burman",                color: "#c08a35" },
    sinitic:   { label: "Sinitic",                      color: "#8c5a3c" },
    taikadai:  { label: "Tai-Kadai",                    color: "#7f8a63" },
    hmongmien: { label: "Hmong-Mien",                   color: "#8d6b8e" },
    austro:    { label: "Austroasiatic / Austronesian", color: "#5f8a7a" },
    other:     { label: "Other families",               color: "#b7a888" }
  };
  function famColor(k) { return (FAMILIES[k] || FAMILIES.other).color; }
  function famLabel(k) { return (FAMILIES[k] || FAMILIES.other).label; }

  var GEO_TYPE = {
    range: "Mountain range", river: "River",
    water: "Lake", dry: "Desert & dry basin", land: "Plateau, basin & plain"
  };

  var $ = function (id) { return document.getElementById(id); };

  /* Below this width the side panel becomes a bottom sheet and the map is
     retuned: fewer labels, looser clusters, bigger touch targets. */
  var MOBILE_MAX = 760;
  function isMobile() { return window.innerWidth <= MOBILE_MAX; }

  /* How much of the viewport the sheet is covering, so the map can frame
     its content in the part you can actually see. */
  function sheetHeight() {
    if (!isMobile()) return 0;
    // derived from the sheet's state, not measured — a measurement taken
    // mid-transition would frame the map against a height it is leaving
    return Sheet.height();
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function comma(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  /* Population strings are prose ("~2.1 m of 11,067,929 'Miao'"). Pull a number. */
  function popNum(p) {
    if (p._n != null) return p._n;
    var m = /([\d][\d,.]*)\s*(m\b|million)?/i.exec(String(p.pop || ""));
    var n = 0;
    if (m) {
      n = parseFloat(m[1].replace(/,/g, "")) || 0;
      if (m[2]) n *= 1e6;
    }
    p._n = n;
    return n;
  }

  /* ==========================================================
     1. LOADING SCREEN
     ========================================================== */
  var LoadScreen = (function () {
    var stages = [
      "Unrolling the map",
      "Counting fifty-six, and then some",
      "Sorting valley from ridge",
      "Marking the pastures",
      "Ready"
    ];
    var names = PEOPLES.length ? PEOPLES.slice() : [{ name: "China", endo: "" }];

    function shuffle(a) {
      a = a.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function run(done) {
      var num = $("loaderNum"), bar = $("loaderBar"), status = $("loaderStatus"),
          tName = $("tickerName"), tEndo = $("tickerEndo");
      var pool = shuffle(names), idx = -1;

      // Time-based rather than tick-based, so the wall-clock duration holds
      // even when the browser throttles timers.
      var DURATION = 2700;
      var clock = (window.performance && performance.now)
        ? function () { return performance.now(); }
        : function () { return Date.now(); };
      var t0 = clock(), finished = false;

      function finish() {
        if (finished) return;
        finished = true;
        tName.textContent = "The Fifty-Six";
        tEndo.textContent = "中国的民族";
        setTimeout(function () {
          document.body.classList.add("is-done");
          document.body.classList.remove("is-loading");
          setTimeout(function () {
            var el = $("loader");
            if (el && el.parentNode) el.parentNode.removeChild(el);
          }, 1800);
          if (done) done();
        }, 620);
      }

      /* requestAnimationFrame is paused in a background tab. Without this
         guard a page opened in one never boots at all: the loader sits at
         zero and the map is never built. The timer is the real clock; the
         frame loop only decorates it. */
      setTimeout(finish, DURATION + 500);

      (function frame() {
        if (finished) return;
        var now = clock();
        var t = Math.min(1, (now - t0) / DURATION);
        var pct = (1 - Math.pow(1 - t, 2.6)) * 100;

        num.textContent = Math.floor(pct);
        bar.style.width = pct + "%";
        status.textContent = stages[Math.min(stages.length - 1, Math.floor(pct / 21))];

        var want = Math.floor((now - t0) / 110);
        if (want !== idx) {
          idx = want;
          var p = pool[idx % pool.length];
          tName.textContent = p.name;
          tEndo.textContent = p.endo || "";
        }

        if (t < 1) requestAnimationFrame(frame);
        else setTimeout(finish, 260);
      })();
    }
    return { run: run };
  })();

  /* ==========================================================
     2. MAP TYPES
     ========================================================== */
  var ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/";
  var ESRI2 = "https://services.arcgisonline.com/ArcGIS/rest/services/";

  /* Plain map: flat vector fills. Set true to lay a hillshade underneath
     and let the relief show through the province tints. */
  var PLAIN_SHADE = false;

  /* Eight muted earth pastels. A greedy graph-colouring in the build step
     guarantees no two bordering provinces draw the same one. */
  var PROV_TINTS = [
    "#cfd9c2", "#ecdcb9", "#e3c9c4", "#c6d4dc",
    "#dcd8b6", "#e8cfa8", "#d3cddd", "#c8dbd2"
  ];
  var SEA = "#cfdfe6", NEIGHBOUR_LAND = "#e4e0d6";

  var MODES = {
    plain: {
      caption: "A flat political map: one pastel per province, no two neighbours alike, with every autonomous unit picked out on top.",
      maxZoom: 13,
      // Drawn entirely from vectors — no basemap raster at all. With
      // PLAIN_SHADE on, a hillshade raster is laid underneath and the
      // province fills go slightly translucent so the relief reads through.
      tiles: PLAIN_SHADE
        ? [{ url: ESRI + "Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}", max: 16,
             opacity: 0.55, attr: "Esri, USGS · boundaries: DataV.GeoAtlas · land: Natural Earth" }]
        : [{ url: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
             max: 13, opacity: 0,
             attr: "Boundaries: DataV.GeoAtlas · land: Natural Earth" }]
    },
    earth: {
      caption: "Satellite imagery with the landforms named. Nearly every division on the ethnic map is one of these — a range, a gorge, a plateau rim.",
      maxZoom: 15,
      tiles: [
        { url: ESRI + "World_Imagery/MapServer/tile/{z}/{y}/{x}", max: 17,
          attr: "Esri, Maxar, Earthstar Geographics, USGS, NOAA" },
        { url: ESRI + "Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", max: 13, opacity: 0.4 }
      ]
    },
    trade: {
      caption: "What each people made, moved and sold — and the roads the goods travelled.",
      maxZoom: 13,
      tiles: [
        { url: ESRI + "World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}", max: 13,
          attr: "Esri, USGS, NOAA" },
        { url: ESRI + "Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", max: 13, opacity: 0.35 }
      ]
    },
    industry: {
      caption: "What the country makes now. Sixty industrial clusters on a dark canvas — and the peoples left as faint dots, because where they are is where the factories are not.",
      maxZoom: 14,
      tiles: [
        { url: ESRI2 + "Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", max: 13,
          attr: "Esri, HERE, Garmin, OpenStreetMap contributors" },
        { url: ESRI2 + "Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", max: 13, opacity: 0.85 }
      ]
    },
    density: {
      caption: "Population and the administrative map: provinces, then autonomous prefectures, then autonomous counties as you zoom.",
      maxZoom: 14,
      tiles: [
        { url: ESRI2 + "Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", max: 13,
          attr: "Esri, HERE, Garmin, OpenStreetMap contributors" },
        { url: ESRI2 + "Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", max: 13, opacity: 1 }
      ]
    }
  };

  var mode = "plain";

  /* ==========================================================
     3. MAP
     ========================================================== */
  var map, tileLayers = [], layers = {}, groups = [], activeId = null, borderCanvas, heatLayer;

  function initMap() {
    map = L.map("map", {
      zoomControl: false, attributionControl: true,
      minZoom: 3, maxZoom: 13, zoomSnap: 0.5, zoomDelta: 0.5,
      wheelPxPerZoomLevel: 110, worldCopyJump: false
    });
    map.setView([35.5, 104], 4);
    map.setMaxBounds([[-2, 52], [72, 160]]);
    // 61 degrees of longitude will not fit a phone at zoom 3
    map.setMinZoom(isMobile() ? 2.4 : 3);

    borderCanvas   = L.canvas({ padding: 0.3 });  // thousands of segments; SVG is too slow
    layers.borders = L.layerGroup().addTo(map);   // admin boundaries
    layers.vector  = L.layerGroup().addTo(map);   // polylines: rivers, ranges, routes
    layers.bubbles = L.layerGroup().addTo(map);   // density circles
    layers.geo     = L.layerGroup().addTo(map);   // landform labels
    layers.admin   = L.layerGroup().addTo(map);   // autonomous units
    layers.people  = L.layerGroup().addTo(map);   // the peoples themselves

    setMode("plain", true);

    map.on("zoomend", updateTileFades);
    map.on("zoomend moveend", render);
    homeView(false);

    $("zoomIn").onclick = function () { map.zoomIn(1); };
    $("zoomOut").onclick = function () { map.zoomOut(1); };
    $("zoomReset").onclick = function () { homeView(true); };
    window.addEventListener("resize", function () {
      map.setMinZoom(isMobile() ? 2.4 : 3);
      map.invalidateSize();
    });

    document.querySelector(".modes__bar").addEventListener("click", function (e) {
      var b = e.target.closest(".modes__btn");
      if (b) setMode(b.getAttribute("data-mode"));
    });
  }

  function setMode(id, silent) {
    if (!MODES[id]) return;
    mode = id;
    var cfg = MODES[id];

    document.body.className = document.body.className
      .replace(/\bmode-\w+\b/g, "").trim() + " mode-" + id;

    Array.prototype.forEach.call(document.querySelectorAll(".modes__btn"), function (b) {
      var on = b.getAttribute("data-mode") === id;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-selected", String(on));
    });
    $("modeCaption").textContent = cfg.caption;

    tileLayers.forEach(function (l) { map.removeLayer(l); });
    tileLayers = cfg.tiles.map(function (t) {
      var layer = L.tileLayer(t.url, {
        maxZoom: 19, maxNativeZoom: t.max,
        opacity: t.opacity == null ? 1 : t.opacity,
        attribution: t.attr || ""
      }).addTo(map);
      layer._fade = t.fade || null;
      return layer;
    });
    map.setMaxZoom(cfg.maxZoom);
    updateTileFades();

    // the heat surface belongs to Density alone
    if (id === "density" && window.HeatLayer && window.PLACES) {
      if (!heatLayer) heatLayer = new window.HeatLayer(window.PLACES);
      if (!map.hasLayer(heatLayer)) heatLayer.addTo(map);
    } else if (heatLayer && map.hasLayer(heatLayer)) {
      map.removeLayer(heatLayer);
    }

    Panel.onModeChange();
    if (!silent) render();
  }

  /* Layers marked with a `fade` range cross-dissolve as you zoom, so the
     basemap that reads best at each scale is the one you see. */
  function updateTileFades() {
    var z = map.getZoom();
    tileLayers.forEach(function (l) {
      if (!l._fade) return;
      var a = l._fade[0], b = l._fade[1];
      var o = z <= a ? 1 : z >= b ? 0 : (b - z) / (b - a);
      l.setOpacity(o);
    });
  }

  /* Frame China inside the space the side panel leaves free. */
  function panelPad() {
    var panel = $("panel");
    if (!panel || panel.classList.contains("is-hidden") || isMobile()) return 40;
    // On a narrow window, clearing the whole panel would push the map so far
    // out that China stops being legible. Accept some overlap instead.
    var free = window.innerWidth - panel.offsetWidth;
    return free < 620 ? Math.round(panel.offsetWidth * 0.45) : panel.offsetWidth + 40;
  }

  function homeView(animate) {
    map.fitBounds([[18.0, 73.5], [53.5, 134.5]], {
      paddingTopLeft: [panelPad(), isMobile() ? 96 : 70],
      paddingBottomRight: [70, 60 + sheetHeight()],
      animate: !!animate
    });
    // The floor keeps a wide window from drifting out to whole-continent
    // scale. On a phone the country only fits below it, so it is skipped.
    if (!isMobile() && map.getZoom() < 3.5) map.setZoom(3.5);
  }

  function fitPath(paths) {
    // accepts one path or a list of them
    var pts = (paths.length && Array.isArray(paths[0][0])) ? [].concat.apply([], paths) : paths;
    map.fitBounds(L.latLngBounds(pts), {
      paddingTopLeft: [panelPad(), isMobile() ? 110 : 90],
      paddingBottomRight: [80, 70 + sheetHeight()],
      animate: true, maxZoom: 8
    });
  }

  function flyTo(lat, lng, z) {
    var target = Math.max(map.getZoom(), z || 6.5);
    var sheet = sheetHeight();
    if (sheet > 120) {
      // Centre the point in the strip of map the sheet leaves visible,
      // rather than behind the sheet.
      var pt = map.project([lat, lng], target);
      pt.y += sheet / 2;
      map.flyTo(map.unproject(pt, target), target, { duration: 1.1 });
    } else {
      map.flyTo([lat, lng], target, { duration: 1.1 });
    }
  }

  /* ---------- clustering ---------- */
  function clusterRadius() {
    var z = map.getZoom(), r;
    if (z <= 4) r = 64;
    else if (z <= 5) r = 54;
    else if (z <= 6) r = 44;
    else if (z <= 7.5) r = 36;
    else r = 30;
    // a phone shows the same markers in a third of the width
    return isMobile() ? Math.round(r * 1.35) : r;
  }

  function buildGroups() {
    var pts = PEOPLES.map(function (p) {
      return { p: p, xy: map.latLngToLayerPoint([p.lat, p.lng]) };
    });
    var R = clusterRadius(), R2 = R * R;
    var used = new Array(pts.length), out = [];

    for (var i = 0; i < pts.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      var members = [pts[i]], cx = pts[i].xy.x, cy = pts[i].xy.y;
      for (var j = i + 1; j < pts.length; j++) {
        if (used[j] || members.length >= 7) continue;
        var dx = pts[j].xy.x - cx, dy = pts[j].xy.y - cy;
        if (dx * dx + dy * dy < R2) {
          used[j] = true;
          members.push(pts[j]);
          cx = (cx * (members.length - 1) + pts[j].xy.x) / members.length;
          cy = (cy * (members.length - 1) + pts[j].xy.y) / members.length;
        }
      }
      out.push({
        members: members.map(function (m) { return m.p; }),
        latlng: map.layerPointToLatLng(L.point(cx, cy))
      });
    }
    return out;
  }

  function sharedZone(members) {
    var tally = {}, best = null, bestN = 0;
    members.forEach(function (m) {
      if (!m.zone) return;
      tally[m.zone] = (tally[m.zone] || 0) + 1;
      if (tally[m.zone] > bestN) { bestN = tally[m.zone]; best = m.zone; }
    });
    return bestN >= 2 && ZONES[best] ? best : null;
  }

  /* ---------- density scales ---------- */
  function logScale(v, lo, hi, outLo, outHi) {
    if (v <= 0) return outLo;
    var t = (Math.log10(v) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo));
    return outLo + Math.max(0, Math.min(1, t)) * (outHi - outLo);
  }
  var DENSITY_BANDS = [
    { max: 10,     color: "#efe4cc", label: "under 10" },
    { max: 50,     color: "#dbc79b", label: "10 – 50" },
    { max: 150,    color: "#c9a662", label: "50 – 150" },
    { max: 400,    color: "#c08a35", label: "150 – 400" },
    { max: 1000,   color: "#a4502c", label: "400 – 1,000" },
    { max: Infinity, color: "#6b2f1c", label: "over 1,000" }
  ];
  function densityColor(d) {
    for (var i = 0; i < DENSITY_BANDS.length; i++) if (d < DENSITY_BANDS[i].max) return DENSITY_BANDS[i].color;
    return DENSITY_BANDS[DENSITY_BANDS.length - 1].color;
  }
  function density(pv) { return pv.pop / pv.area; }

  /* ==========================================================
     4. RENDER
     ========================================================== */
  /* ---------- label collision ----------
     Labels are placed in priority order and anything that would
     overlap something already placed is dropped, keeping its dot.  */
  var collider;
  function newCollider() {
    var boxes = [];
    return {
      tryPlace: function (latlng, w, h) {
        var p = map.latLngToLayerPoint(L.latLng(latlng));
        var b = { x1: p.x - w / 2, x2: p.x + w / 2, y1: p.y - h / 2, y2: p.y + h / 2 };
        for (var i = 0; i < boxes.length; i++) {
          var o = boxes[i];
          if (b.x1 < o.x2 && b.x2 > o.x1 && b.y1 < o.y2 && b.y2 > o.y1) return false;
        }
        boxes.push(b);
        return true;
      }
    };
  }
  function textWidth(s, px) { return String(s).length * (px || 7.1) + 12; }

  /* shift a latlng by a pixel amount at the current zoom */
  function offsetLatLng(ll, dy) {
    return map.layerPointToLatLng(map.latLngToLayerPoint(L.latLng(ll)).add(L.point(0, dy)));
  }

  /* Find a vertical offset at which this label fits, or null if none does.
     Below the dot is the house style; the rest are fallbacks for markers
     that sit on top of something already labelled. */
  function placeLabel(latlng, w, h, baseDy) {
    var tries = [baseDy, -(baseDy + h), baseDy + h + 6, -(baseDy + 2 * h)];
    for (var i = 0; i < tries.length; i++) {
      if (collider.tryPlace(offsetLatLng(latlng, tries[i]), w, h)) return tries[i];
    }
    return null;
  }

  /* ---------- administrative boundaries ----------
     Three tiers, three line weights, three colours: province, prefecture,
     and every unit that is autonomous for one or more of the peoples.  */
  function bbox(f) {
    if (f._b) return f._b;
    var s = 90, n = -90, w = 180, e = -180;
    f.r.forEach(function (ring) {
      ring.forEach(function (p) {
        if (p[0] < s) s = p[0];
        if (p[0] > n) n = p[0];
        if (p[1] < w) w = p[1];
        if (p[1] > e) e = p[1];
      });
    });
    f._b = L.latLngBounds([s, w], [n, e]);
    return f._b;
  }

  function drawRings(f, opts, onClick) {
    f.r.forEach(function (ring) {
      var line = L.polyline(ring, opts).addTo(layers.borders);
      if (onClick) line.on("click", onClick);
    });
  }

  /* The flat map is drawn rather than photographed: neighbouring landmass
     first, then country outlines, then a pastel per province. */
  function renderFlatBase() {
    var F = window.FLATMAP;
    if (!F) return;
    var view = map.getBounds();
    var fillOpacity = PLAIN_SHADE ? 0.72 : 1;

    F.land.forEach(function (ring) {
      L.polygon(ring, {
        renderer: borderCanvas, stroke: false,
        fillColor: NEIGHBOUR_LAND, fillOpacity: fillOpacity, interactive: false
      }).addTo(layers.borders);
    });

    F.country.forEach(function (ring) {
      L.polyline(ring, {
        renderer: borderCanvas, color: "#b3ab9b", weight: 0.8,
        opacity: 0.75, fill: false, interactive: false
      }).addTo(layers.borders);
    });

    window.BORDERS.province.forEach(function (f) {
      if (!view.overlaps(bbox(f))) return;
      var tint = PROV_TINTS[F.tint[f.c] % PROV_TINTS.length];
      f.r.forEach(function (ring) {
        L.polygon(ring, {
          renderer: borderCanvas, stroke: false,
          fillColor: tint, fillOpacity: fillOpacity
        }).addTo(layers.borders)
          .on("click", function () {
            var pv = provByCode(f.c);
            if (pv) Panel.showInfo("prov", pv.id);
          });
      });
    });
  }

  /* our PROVINCES entries carry no adcode, so match on the Chinese name */
  var _provByCode = null;
  function provByCode(code) {
    if (!_provByCode) {
      _provByCode = {};
      (window.BORDERS.province || []).forEach(function (b) {
        for (var i = 0; i < PROV.length; i++) {
          if (b.n.indexOf(PROV[i].cn) === 0) { _provByCode[b.c] = PROV[i]; break; }
        }
      });
    }
    return _provByCode[code];
  }

  /* Province lines appear in every mode; each one needs its own treatment to
     read against its basemap. Earth gets a light line over a dark casing,
     since satellite imagery runs from bright desert to near-black forest. */
  var PROV_LINE = {
    plain:    { color: "#3a2f22", weight: 1.3, opacity: 0.85 },
    density:  { color: "#3a2f22", weight: 1.0, opacity: 0.45 },
    industry: { color: "#8fa3b5", weight: 0.9, opacity: 0.5 },
    earth:    { color: "#f4ecdc", weight: 1.0, opacity: 0.55, casing: "rgba(8,12,10,.5)" },
    trade:    { color: "#5d4c37", weight: 0.9, opacity: 0.45 }
  };

  function renderBorders() {
    var B = window.BORDERS;
    if (!B) return;
    var z = map.getZoom(), view = map.getBounds();

    if (mode === "plain") renderFlatBase();

    // 2nd tier — prefectures, the fine grid, only once you are close enough
    if (mode === "plain" && z >= 5.5) {
      B.prefecture.forEach(function (f) {
        if (!view.overlaps(bbox(f))) return;
        drawRings(f, {
          renderer: borderCanvas, color: "#7d6a4e", weight: 0.7, opacity: 0.55,
          dashArray: "3 4", fill: false, interactive: false
        });
      });
    }

    // 3rd tier — the autonomy layer, which is what this atlas is about
    if (mode === "plain" && z >= 4) {
      B.autonomy.forEach(function (f) {
        if (!view.overlaps(bbox(f))) return;
        var unit = null;
        for (var i = 0; i < AUTO.length; i++) if (AUTO[i].id === f.id) { unit = AUTO[i]; break; }
        f.r.forEach(function (ring) {
          // On flat pastel the old ochre wash went muddy, so the autonomy
          // layer now reads as a firm outline plus a neutral darkening.
          L.polygon(ring, {
            renderer: borderCanvas,
            color: f.lvl === "county" ? "#8a5a24" : "#a4502c",
            weight: f.lvl === "county" ? 1.4 : 2.1, opacity: 0.95,
            fillColor: "#6b4a2a", fillOpacity: 0.11
          }).addTo(layers.borders)
            .on("click", function () { if (unit) Panel.showInfo("auto", unit.id); });
        });
      });
    }

    // 1st tier — provinces, drawn last so they sit on top of the finer lines
    var provStyle = PROV_LINE[mode] || PROV_LINE.plain;
    B.province.forEach(function (f) {
      if (!view.overlaps(bbox(f))) return;
      if (provStyle.casing) {
        drawRings(f, {
          renderer: borderCanvas, color: provStyle.casing,
          weight: provStyle.weight + 2.5, opacity: 0.9,
          fill: false, interactive: false
        });
      }
      drawRings(f, {
        renderer: borderCanvas, color: provStyle.color,
        weight: provStyle.weight, opacity: provStyle.opacity,
        fill: false, interactive: false
      });
    });

    // Province names. The flat map has no basemap labelling of its own,
    // so these carry it until the prefecture grid takes over.
    if (mode === "plain" && z <= 7 && (!isMobile() || z >= 4.5)) {
      PROV.forEach(function (pv) {
        if (!view.contains([pv.lat, pv.lng])) return;
        var nm = pv.name.replace(/ (A\.R\.|SAR)$/, "");
        if (!collider.tryPlace([pv.lat, pv.lng], textWidth(nm, 7.6), 26)) return;
        divMarker([pv.lat, pv.lng], "pv",
          '<span class="pv__label">' + esc(nm) + "</span>",
          function () { Panel.showInfo("prov", pv.id); }, layers.borders, -400);
      });
    }
  }

  function render() {
    if (!map) return;
    collider = newCollider();
    layers.people.clearLayers();
    layers.borders.clearLayers();
    layers.vector.clearLayers();
    layers.geo.clearLayers();
    layers.admin.clearLayers();
    layers.bubbles.clearLayers();

    renderBorders();
    if (mode === "earth")    renderGeo();
    if (mode === "trade")    renderRoutes();
    if (mode === "density")  renderDensity();
    if (mode === "industry") renderIndustry();
    renderPeople();
  }

  /* ---------- industry: the clusters ---------- */
  function renderIndustry() {
    var z = map.getZoom();
    INDUSTRY.forEach(function (h) {
      if (h.tier === 3 && z < 4.4) return;          // thin the map right out
      var c = (SECTORS[h.sector] || {}).color || "#95a3b3";
      var size = h.tier === 1 ? 14 : h.tier === 2 ? 10 : 7;
      var lab = collider.tryPlace([h.lat, h.lng], 168, 44);

      divMarker([h.lat, h.lng], "in in--t" + h.tier,
        '<span class="in__ring" style="border-color:' + c + '"></span>' +
        '<span class="in__node" style="background:' + c +
          ";width:" + size + "px;height:" + size + 'px"></span>' +
        (lab
          ? '<span class="in__label" style="top:calc(50% + ' + (size / 2 + 6) + 'px)">' +
            esc(h.name) + "<em>" + esc(h.makes) + "</em></span>"
          : ""),
        function () { Panel.showInfo("hub", h.id); }, layers.geo);
    });
  }

  function divMarker(latlng, cls, html, onClick, layer, z) {
    var m = L.marker(latlng, {
      icon: L.divIcon({ className: cls, html: html, iconSize: [0, 0], iconAnchor: [0, 0] }),
      riseOnHover: true, keyboard: false, zIndexOffset: z || 0
    });
    if (onClick) m.on("click", onClick);
    m.addTo(layer);
    return m;
  }

  /* ---------- the peoples ---------- */
  function renderPeople() {
    groups = buildGroups();

    // bigger clusters claim label space first
    var order = groups.map(function (g, i) { return i; })
      .sort(function (a, b) { return groups[b].members.length - groups[a].members.length; });

    order.forEach(function (gi) {
      var g = groups[gi];
      var single = g.members.length === 1;
      // Density mode asks a different question of the dots — not what they
      // speak but what they live in — so the colour key changes with it.
      var color = "#5c4a33";
      if (single) {
        var m0 = g.members[0];
        color = (mode === "density" && m0.dwelling && DWELL[m0.dwelling.t])
          ? DWELL[m0.dwelling.t].color
          : famColor(m0.fam);
      }
      var cls = "mk mk--people" + (single ? "" : " mk--group") +
                (mode === "trade" ? " mk--trade" : "");
      var html, size = 14, label, wide, tall = 20;

      if (single) {
        var p = g.members[0];
        if (p.id === activeId) cls += " is-active";

        if (mode === "trade" && p.trade) {
          label = esc(p.name) + "<em>" + esc(p.trade.sig) + "</em>";
          wide = 155; tall = 40;
        } else {
          label = esc(p.name);
          wide = textWidth(p.name);
          if (mode === "density") size = Math.round(logScale(popNum(p), 4000, 1.3e9, 9, 34));
        }

        // in density mode the province bubbles carry the story at low zoom;
        // in industry mode the peoples are deliberately mute; on a phone
        // there is simply no room for names until you are well zoomed in
        var mute = (mode === "density" && map.getZoom() < 5) ||
                   mode === "industry" ||
                   (isMobile() && map.getZoom() < 5.5);

        // Landforms are drawn first and claim their space, so a people sitting
        // on one — the Mosuo live on the shore of Lugu Lake, a few pixels from
        // its label — would always lose. Try a handful of positions round the
        // dot before giving up on the name entirely.
        var baseDy = (mode === "density" ? size / 2 + 4 : 12);
        var dy = mute ? null : placeLabel(g.latlng, wide, tall, baseDy);
        html =
          (mode === "density" ? "" : '<span class="mk__pulse" style="color:' + color + '"></span>') +
          '<span class="mk__dot" style="background:' + color +
            (mode === "density" ? ";width:" + size + "px;height:" + size + "px;opacity:.82" : "") +
            '"></span>' +
          (dy !== null
            ? '<span class="mk__label" style="top:calc(50% + ' + dy + 'px)">' +
              label + "</span>"
            : "");
      } else {
        var zk = sharedZone(g.members), gl;
        if (zk) gl = esc(ZONES[zk].name) + ' <i>· ' + g.members.length + " peoples</i>";
        else gl = esc(g.members[0].name) + ' <i>+' + (g.members.length - 1) + " more</i>";

        var gmute = (mode === "density" && map.getZoom() < 5) ||
                    mode === "industry" ||
                    (isMobile() && map.getZoom() < 4.6);
        var gdy = gmute
          ? null : placeLabel(g.latlng, zk ? 190 : 150, zk ? 58 : 40, 19);
        html =
          (mode === "density" ? "" : '<span class="mk__pulse" style="color:' + color + '"></span>') +
          '<span class="mk__dot" style="background:' + color + '">' +
            '<span class="mk__count">' + g.members.length + "</span></span>" +
          (gdy !== null
            ? '<span class="mk__label" style="top:calc(50% + ' + gdy + 'px)">' + gl + "</span>"
            : "");
      }

      divMarker(g.latlng, cls, html, function () {
        if (single) Panel.showDetail(g.members[0].id);
        else Panel.showCluster(gi);
      }, layers.people, mode === "earth" ? -200 : 0);
    });
  }

  /* ---------- earth: landforms ---------- */
  function midpoint(path) { return path[Math.floor(path.length / 2)]; }

  /* Ranges carry one indicative path; rivers arrive from Natural Earth as
     several named upstream segments, so both are handled as a list. */
  function pathsOf(f) {
    return f.paths || (f.path ? [f.path] : []);
  }
  function longestPath(f) {
    var all = pathsOf(f), best = all[0] || [];
    for (var i = 1; i < all.length; i++) if (all[i].length > best.length) best = all[i];
    return best;
  }

  function renderGeo() {
    var z = map.getZoom();

    GEO.forEach(function (f) {
      var isLine = f.type === "range" || f.type === "river";

      if (isLine) {
        pathsOf(f).forEach(function (path) {
          var line = L.polyline(path, {
            color: f.type === "river" ? "#63b6d6" : "#e3c07a",
            weight: f.type === "river" ? 2.6 : 4,
            opacity: 0.85,
            dashArray: f.type === "range" ? "1 9" : null,
            lineCap: "round", lineJoin: "round",
            interactive: true
          }).addTo(layers.vector);
          line.on("click", function () { Panel.showInfo("geo", f.id); });

          // a soft dark casing so the line reads on both light and satellite bases
          L.polyline(path, {
            color: "rgba(20,26,24,.35)",
            weight: (f.type === "river" ? 2.6 : 4) + 4,
            opacity: 0.5, interactive: false
          }).addTo(layers.vector).bringToBack();
        });

        var mid = f.labelAt || midpoint(longestPath(f));
        if (mid && collider.tryPlace(mid, textWidth(f.name, 8.2), 22)) {
          divMarker(mid, "gf gf--" + f.type,
            '<span class="gf__label">' + esc(f.name) + "</span>",
            function () { Panel.showInfo("geo", f.id); }, layers.geo);
        }
      } else {
        if (f.type === "land" && z >= 7) return;   // big-area labels get noisy up close
        var lab = collider.tryPlace(f.at, textWidth(f.name, 8.2), 30);
        divMarker(f.at, "gf gf--point gf--" + f.type,
          '<span class="gf__mark"></span>' +
          (lab ? '<span class="gf__label">' + esc(f.name) + "</span>" : ""),
          function () { Panel.showInfo("geo", f.id); }, layers.geo);
      }
    });
  }

  /* ---------- trade: routes ---------- */
  function renderRoutes() {
    ROUTES.forEach(function (r) {
      L.polyline(r.path, {
        color: "rgba(60,40,24,.28)", weight: 7, opacity: .5, interactive: false
      }).addTo(layers.vector);

      var line = L.polyline(r.path, {
        color: "#a4502c", weight: 2.5, opacity: .95,
        dashArray: "10 7", lineCap: "round"
      }).addTo(layers.vector);
      line.on("click", function () { Panel.showInfo("route", r.id); });

      var rm = midpoint(r.path);
      if (collider.tryPlace(rm, textWidth(r.name, 7.6), 26)) {
        divMarker(rm, "rt", '<span class="rt__label">' + esc(r.name) + "</span>",
          function () { Panel.showInfo("route", r.id); }, layers.geo);
      }
    });
  }

  /* ---------- density ----------
     A heat surface over 427 real settlements, not a province average.
     Averaging over a province is a lie of a particular kind: it spreads
     Xinjiang's people evenly across the Taklamakan, when in fact they
     are all in a ring of oases. Points do not make that claim.        */
  function renderDensity() {
    var z = map.getZoom();

    PROV.forEach(function (pv) {
      if (!map.getBounds().contains([pv.lat, pv.lng])) return;
      var short = pv.name.replace(/ (A\.R\.|SAR)$/, "");
      if (collider.tryPlace([pv.lat, pv.lng], textWidth(short, 7.4), 40)) {
        divMarker([pv.lat, pv.lng], "mk",
          '<span class="dn__label">' + esc(short) +
            '<span class="dn__sub">' + comma(density(pv)) + " / km&sup2;</span></span>",
          function () { Panel.showInfo("prov", pv.id); }, layers.bubbles);
      }
    });

    AUTO.forEach(function (a) {
      if (a.level === "prefecture" && z < 5) return;
      if (a.level === "county" && z < 6.5) return;
      var lab = collider.tryPlace([a.lat, a.lng], textWidth(a.name, 6.4), 28);
      divMarker([a.lat, a.lng], "au au--" + a.level,
        '<span class="au__mark"></span>' +
        (lab ? '<span class="au__label">' + esc(a.name) + "</span>" : ""),
        function () { Panel.showInfo("auto", a.id); }, layers.admin);
    });
  }

  /* ==========================================================
     4b. BOTTOM SHEET (phones only)
     Three heights — peek, half, full. Drag the handle to move
     between them, or tap it to toggle peek and half.
     ========================================================== */
  var Sheet = (function () {
    var panel, handle, state = "half";
    var dragging = false, startY = 0, startH = 0, moved = 0;

    function heights() {
      var h = window.innerHeight;
      return { peek: 120, half: Math.round(h * 0.46), full: Math.round(h * 0.90) };
    }
    function height() { return isMobile() ? heights()[state] : 0; }
    function apply(s) {
      state = s;
      panel.style.height = "";
      panel.classList.toggle("is-hidden", s === "peek");
      panel.classList.toggle("is-full", s === "full");
      $("panelToggle").setAttribute("aria-expanded", String(s !== "peek"));
      setTimeout(function () { if (map) map.invalidateSize(); }, 380);
    }
    function nearest(px) {
      var H = heights(), best = "half", bd = Infinity;
      Object.keys(H).forEach(function (k) {
        var d = Math.abs(H[k] - px);
        if (d < bd) { bd = d; best = k; }
      });
      return best;
    }

    function down(e) {
      if (!isMobile()) return;
      dragging = true; moved = 0;
      startY = e.clientY;
      startH = panel.getBoundingClientRect().height;
      panel.classList.add("is-dragging");
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    }
    function move(e) {
      if (!dragging) return;
      var dy = startY - e.clientY;
      moved = Math.max(moved, Math.abs(dy));
      var h = Math.min(window.innerHeight * 0.92,
                       Math.max(60, startH + dy));
      panel.style.height = h + "px";
    }
    function up(e) {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("is-dragging");
      if (e && e.pointerId != null && handle.releasePointerCapture) {
        try { handle.releasePointerCapture(e.pointerId); } catch (err) { /* already gone */ }
      }
      var h = panel.getBoundingClientRect().height;
      // a tap rather than a drag: toggle
      if (moved < 6) apply(state === "peek" ? "half" : "peek");
      else apply(nearest(h));
    }

    /* If a pointer is lost — capture stolen, window blurred, tab hidden
       mid-gesture — the sheet must not be left stuck at a dragged height. */
    function abort() {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("is-dragging");
      apply(nearest(panel.getBoundingClientRect().height));
    }

    /* On a phone the floating legend has nowhere to float, so it lives
       at the top of the sheet instead. */
    function placeLegend() {
      var bar = $("legendbar"), index = $("viewIndex");
      if (!bar || !index) return;
      if (isMobile()) {
        if (bar.parentNode !== index) index.insertBefore(bar, $("modeIndex"));
      } else if (bar.parentNode !== document.body) {
        document.body.appendChild(bar);
        bar.style.left = ""; bar.style.maxWidth = "";
      }
    }

    function init() {
      panel = $("panel"); handle = $("sheetHandle");
      handle.addEventListener("pointerdown", down);
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
      handle.addEventListener("pointercancel", up);
      handle.addEventListener("lostpointercapture", abort);
      window.addEventListener("blur", abort);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) abort();
      });
      placeLegend();
      // Open on the map, not on the index: a phone cannot show the whole
      // country in the strip left above a half-height sheet.
      if (isMobile()) apply("peek");
      window.addEventListener("resize", function () {
        placeLegend();
        panel.style.height = "";
      });
    }
    return { init: init, placeLegend: placeLegend, apply: apply, height: height,
             get state() { return state; } };
  })();

  /* ==========================================================
     5. PANEL
     ========================================================== */
  var Panel = (function () {
    var panel, scroll, vIndex, vCluster, vDetail, vInfo, vAbout;
    var activeFam = null, query = "";

    function show(view) {
      [vIndex, vCluster, vDetail, vInfo, vAbout].forEach(function (v) { v.hidden = v !== view; });
      scroll.scrollTop = 0;
      if (panel.classList.contains("is-hidden")) toggle(true);
    }

    function toggle(force) {
      var open = typeof force === "boolean" ? force : panel.classList.contains("is-hidden");

      if (isMobile()) {                     // the sheet owns its own heights
        Sheet.apply(open ? "half" : "peek");
        return;
      }

      panel.classList.toggle("is-hidden", !open);
      $("panelToggle").setAttribute("aria-expanded", String(open));
      var bar = $("legendbar");
      if (bar) {
        bar.style.left = open ? "" : "20px";
        bar.style.maxWidth = open ? "" : "calc(100vw - 170px)";
      }
      setTimeout(function () { if (map) map.invalidateSize(); }, 650);
    }

    function byId(id) {
      for (var i = 0; i < PEOPLES.length; i++) if (PEOPLES[i].id === id) return PEOPLES[i];
      return null;
    }
    function find(arr, id) {
      for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
      return null;
    }

    /* ---------- list rows ---------- */
    function itemHTML(p) {
      var meta = (mode === "trade" && p.trade) ? p.trade.sig : p.pop;
      return (
        '<button class="item" data-id="' + p.id + '">' +
          '<span class="item__dot" style="background:' + famColor(p.fam) + '"></span>' +
          '<span class="item__body">' +
            '<span class="item__name">' + esc(p.name) + "</span>" +
            (p.unofficial
              ? '<span class="item__split"> — not officially recognised</span>'
              : p.split
                ? '<span class="item__split"> — a division within one nationality</span>'
                : "") +
          "</span>" +
          '<span class="item__meta">' + esc(meta) + "</span>" +
        "</button>"
      );
    }
    function rowHTML(kind, id, cls, name, meta) {
      return '<button class="item item--' + cls + '" data-' + kind + '="' + id + '">' +
             '<span class="item__dot"></span><span class="item__body">' +
             '<span class="item__name">' + esc(name) + "</span></span>" +
             '<span class="item__meta">' + esc(meta || "") + "</span></button>";
    }

    function renderList() {
      var q = query.trim().toLowerCase();
      var rows = PEOPLES.filter(function (p) {
        if (activeFam && p.fam !== activeFam) return false;
        if (!q) return true;
        var hay = p.name + " " + (p.endo || "") + " " + (p.alt || "") + " " + p.prov + " " +
                  p.lang + " " + (p.faith || "") + " " + p.sum +
                  (p.trade ? " " + p.trade.sig + " " + p.trade.hist + " " + p.trade.now : "");
        return hay.toLowerCase().indexOf(q) > -1;
      });

      if (!rows.length) {
        $("list").innerHTML = '<div class="empty">Nothing matches that.</div>';
        return;
      }

      var order = ["tibeto", "taikadai", "hmongmien", "turkic", "mongolic",
                   "tungusic", "austro", "sinitic", "other"];
      var buckets = {};
      rows.forEach(function (p) { (buckets[p.fam] = buckets[p.fam] || []).push(p); });

      var html = "";
      order.forEach(function (k) {
        if (!buckets[k]) return;
        buckets[k].sort(function (a, b) { return a.name.localeCompare(b.name); });
        html += '<div class="list__group">' + esc(famLabel(k)) + " · " + buckets[k].length + "</div>";
        html += buckets[k].map(itemHTML).join("");
      });
      $("list").innerHTML = html;
    }

    function renderFilters() {
      var counts = {};
      PEOPLES.forEach(function (p) { counts[p.fam] = (counts[p.fam] || 0) + 1; });
      var html = '<button class="chip is-on" data-fam="">All ' + PEOPLES.length + "</button>";
      Object.keys(FAMILIES).forEach(function (k) {
        if (!counts[k]) return;
        html += '<button class="chip" data-fam="' + k + '">' + esc(FAMILIES[k].label) + " " + counts[k] + "</button>";
      });
      $("filters").innerHTML = html;
    }

    /* ---------- the mode's own layer, listed in the panel ---------- */
    function renderModeIndex() {
      var el = $("modeIndex"), html = "";

      if (mode === "earth") {
        html += '<p class="modelayer__intro">The physical frame. Click any landform to fly to it and read which peoples it separates.</p>';
        ["range", "river", "water", "dry", "land"].forEach(function (t) {
          var set = GEO.filter(function (f) { return f.type === t; });
          if (!set.length) return;
          html += '<div class="modelayer__title">' + esc(GEO_TYPE[t]) + " · " + set.length + "</div>";
          html += set.map(function (f) {
            return rowHTML("geo", f.id, t, f.name, f.stat);
          }).join("");
        });
      } else if (mode === "trade") {
        html += '<p class="modelayer__intro">Each people is labelled on the map with the one good it is known for. The dashed lines are the roads those goods travelled.</p>';
        html += '<div class="modelayer__title">Trade roads · ' + ROUTES.length + "</div>";
        html += ROUTES.map(function (r) {
          return rowHTML("route", r.id, "route", r.name, r.era);
        }).join("");
        html += '<div class="modelayer__title">Every people, by what they made</div>';
      } else if (mode === "industry") {
        html += '<p class="modelayer__intro">Sixty clusters that between them make a third of the world’s manufactured goods. Node size is the scale of the cluster; the faint dots underneath are the peoples, left in deliberately — the industrial map and the minority map barely touch.</p>';
        Object.keys(SECTORS).forEach(function (s) {
          var set = INDUSTRY.filter(function (h) { return h.sector === s; });
          if (!set.length) return;
          html += '<div class="modelayer__title">' + esc(SECTORS[s].label) + " · " + set.length + "</div>";
          html += set.map(function (h) {
            return '<button class="item item--hub" data-hub="' + h.id + '">' +
                   '<span class="item__dot" style="background:' + SECTORS[s].color + '"></span>' +
                   '<span class="item__body"><span class="item__name">' + esc(h.name) + "</span>" +
                   '<span class="item__split"> ' + esc(h.makes) + "</span></span></button>";
          }).join("");
        });
      } else if (mode === "density") {
        html += '<p class="modelayer__intro">Heat is built from 427 settlements weighted by population, so it shows where people actually live rather than a province average. The dots are coloured by dwelling — felt tent, black hair tent, stilt house, cave, courtyard — and every entry carries what its people built traditionally and what they live in now.</p>';
        var byDensity = PROV.slice().sort(function (a, b) { return density(b) - density(a); });
        html += '<div class="modelayer__title">Provinces by density · ' + PROV.length + "</div>";
        html += byDensity.map(function (pv) {
          return '<button class="item item--prov" data-prov="' + pv.id + '">' +
                 '<span class="item__dot" style="background:' + densityColor(density(pv)) + '"></span>' +
                 '<span class="item__body"><span class="item__name">' + esc(pv.name) + "</span></span>" +
                 '<span class="item__meta">' + comma(density(pv)) + " /km&sup2;</span></button>";
        }).join("");

        var pref = AUTO.filter(function (a) { return a.level === "prefecture"; });
        var cnty = AUTO.filter(function (a) { return a.level === "county"; });
        html += '<div class="modelayer__title">Autonomous prefectures · ' + pref.length + "</div>";
        html += pref.map(function (a) { return rowHTML("auto", a.id, "auto", a.name, a.prov); }).join("");
        html += '<div class="modelayer__title">Autonomous counties &amp; banners · ' + cnty.length + "</div>";
        html += cnty.map(function (a) { return rowHTML("auto", a.id, "auto", a.name, a.prov); }).join("");
        html += '<div class="modelayer__title">The peoples themselves</div>';
      }

      el.innerHTML = html;
    }

    /* ---------- legend ---------- */
    /* The legend is a bottom drawer; each mode fills it with its own
       side-by-side groups so it stays short rather than running up the
       side of the index panel. */
    function group(title, rows, cols) {
      var inner;
      if (cols === 2) {
        // explicit halves rather than CSS columns: a multi-column box does not
        // shrink-wrap, and the drawer is sized to its content
        var half = Math.ceil(rows.length / 2);
        inner = '<div class="legend__cols"><div>' + rows.slice(0, half).join("") +
                "</div><div>" + rows.slice(half).join("") + "</div></div>";
      } else {
        inner = '<div class="legend__rows">' + rows.join("") + "</div>";
      }
      return '<div class="legend__group"><div class="legend__title">' + title +
             "</div>" + inner + "</div>";
    }
    function swatch(cls, label, note) {
      return '<div class="legend__row"><i class="sw ' + cls + '"></i>' + label +
             (note ? " <em>" + note + "</em>" : "") + "</div>";
    }
    var LEGEND_TITLE = {
      plain: "Boundaries & peoples",
      earth: "Landforms",
      trade: "Goods & roads",
      industry: "Sectors",
      density: "Population"
    };

    function familyGroup() {
      return group("Language family", Object.keys(FAMILIES).map(function (k) {
        return '<div class="legend__row"><i class="sw" style="background:' +
               FAMILIES[k].color + '"></i>' + esc(FAMILIES[k].label) + "</div>";
      }), 2);
    }

    function renderLegend() {
      var html = "";

      if (mode === "plain") {
        html += group("Boundaries", [
          swatch("sw--prov", "Province / region"),
          swatch("sw--pref", "Prefecture", "from zoom 5.5"),
          swatch("sw--auto-p", "Autonomous prefecture"),
          swatch("sw--auto-c", "Autonomous county / banner")
        ]);
        html += familyGroup();
        html += '<div class="legend__note">Each province takes one of eight pastels, chosen so no two neighbours match. Click a province or any outlined autonomous unit to open it.</div>';

      } else if (mode === "earth") {
        html += group("Landforms", [
          swatch("sw--line", "Mountain range"),
          swatch("sw--wave", "River"),
          '<div class="legend__row"><i class="sw" style="background:#5a8fa0"></i>Lake</div>',
          '<div class="legend__row"><i class="sw sw--dia" style="background:#ddb264"></i>Desert &amp; dry basin</div>',
          '<div class="legend__row"><i class="sw sw--sq" style="background:#7f8a63"></i>Plateau, basin, plain</div>'
        ]);
        html += familyGroup();
        html += '<div class="legend__note">The peoples are dimmed here. Click a landform to see what it divides.</div>';

      } else if (mode === "trade") {
        html += group("Routes", [swatch("sw--route", "Historic trade road")]);
        html += familyGroup();
        html += '<div class="legend__note">Marker labels show the good each people is known for.</div>';

      } else if (mode === "industry") {
        html += group("Sector", Object.keys(SECTORS).map(function (k) {
          return '<div class="legend__row"><i class="sw sw--sq" style="background:' +
                 SECTORS[k].color + '"></i>' + esc(SECTORS[k].label) + "</div>";
        }), 2);
        html += group("Scale", [
          '<div class="legend__row"><i class="sw sw--node1"></i>World-scale cluster</div>',
          '<div class="legend__row"><i class="sw sw--node2"></i>Major national cluster</div>',
          '<div class="legend__row"><i class="sw sw--node3"></i>Specialist <em>from zoom 4.4</em></div>'
        ]);
        html += '<div class="legend__note">The faint dots are the peoples, unlabelled here. The industrial map is coastal and Han; the autonomous belt appears mainly as raw materials — rare earths at Baotou and Ganzhou, potash and lithium at Golmud, polysilicon in Xinjiang.</div>';

      } else if (mode === "density") {
        html += group("Where people are", [
          '<div class="legend__row"><i class="sw sw--heat"></i>sparse &nbsp;&rarr;&nbsp; dense</div>'
        ]);
        html += group("How they live", Object.keys(DWELL).map(function (k) {
          return '<div class="legend__row"><i class="sw" style="background:' +
                 DWELL[k].color + '"></i>' + esc(DWELL[k].label) + "</div>";
        }), 2);
        html += group("Also shown", [
          swatch("sw--tri", "Autonomous prefecture / county"),
          swatch("sw--prov", "Province outline, with its density")
        ]);
        html += '<div class="legend__note">Heat comes from 427 real settlements weighted by population, not province averages — an average spreads Xinjiang&rsquo;s people evenly across the Taklamakan when they are in fact all in a ring of oases. The dots are the peoples, coloured here by what they build rather than what they speak.</div>';
      }

      $("legend").innerHTML = html;
      $("legendTitle").textContent = LEGEND_TITLE[mode] || "Legend";
    }

    function onModeChange() {
      renderModeIndex();
      renderLegend();
      renderList();
      if (!vAbout.hidden) return;                 // leave About alone on a mode switch
      if (!vDetail.hidden && activeId) showDetail(activeId, true);
      else if (!vInfo.hidden) show(vIndex);
    }

    /* ---------- people detail ---------- */
    function detailHTML(p) {
      var d = p.detail || {};
      var h =
        '<div class="d__kicker">' + esc(famLabel(p.fam)) +
          (p.unofficial ? " · not officially recognised" : "") + "</div>" +
        '<h2 class="d__name">' + esc(p.name) + "</h2>" +
        (p.endo ? '<p class="d__endo">' + esc(p.endo) + "</p>" : "") +
        (p.alt ? '<p class="d__alt">also: ' + esc(p.alt) + "</p>" : "") +
        '<p class="d__sum">' + esc(p.sum) + "</p>";

      if (p.split) {
        h += '<div class="d__split"><b>Why this is mapped separately</b>' + esc(p.split) + "</div>";
      }

      if (p.trade) {
        h += '<div class="trade__block">' +
               '<div class="trade__sig">' + esc(p.trade.sig) + "</div>" +
               "<b>Historically</b><p>" + esc(p.trade.hist) + "</p>" +
               "<b>Today</b><p>" + esc(p.trade.now) + "</p>" +
             "</div>";
      }

      if (p.dwelling && DWELL[p.dwelling.t]) {
        var dw = DWELL[p.dwelling.t];
        h += '<div class="trade__block dwell__block" style="border-left-color:' + dw.color + '">' +
               '<div class="trade__sig" style="color:' + dw.color + '">' + esc(dw.label) + "</div>" +
               "<b>Traditionally</b><p>" + esc(p.dwelling.trad) + "</p>" +
               "<b>Now</b><p>" + esc(p.dwelling.now) + "</p>" +
             "</div>";
      }

      h += '<dl class="d__facts">' +
        "<dt>Population</dt><dd>" + esc(p.pop) + "</dd>" +
        "<dt>Language</dt><dd>" + esc(p.lang) + "</dd>" +
        "<dt>Religion</dt><dd>" + esc(p.faith) + "</dd>" +
        "<dt>Livelihood</dt><dd>" + esc(p.life) + "</dd>" +
        "<dt>Where</dt><dd>" + esc(p.prov) + "</dd>" +
        "</dl>";

      if (p.zone && ZONES[p.zone]) {
        h += '<div class="d__kicker">Shared ground</div>' +
             '<p class="cluster__note" style="margin-top:8px"><strong>' +
             esc(ZONES[p.zone].name) + ".</strong> " + esc(ZONES[p.zone].note) + "</p>";
      }

      var land = GEO.filter(function (f) {
        return (f.divides || []).indexOf(p.id) > -1;
      });
      if (land.length) {
        h += '<div class="i__h">The ground that shaped them</div><div class="links">' +
             land.map(function (f) {
               return '<button class="link" data-geo="' + f.id + '">' + esc(f.name) + "</button>";
             }).join("") + "</div>";
      }

      h += '<button class="btn" id="readMore">Read more <span>&darr;</span></button>' +
        '<div class="d__more" id="more" hidden>' +
          (d.origins  ? "<h3>Origins</h3><p>" + esc(d.origins) + "</p>" : "") +
          (d.culture  ? "<h3>Culture &amp; livelihood</h3><p>" + esc(d.culture) + "</p>" : "") +
          (d.language ? "<h3>Language &amp; writing</h3><p>" + esc(d.language) + "</p>" : "") +
          (d.today    ? "<h3>Today</h3><p>" + esc(d.today) + "</p>" : "") +
        "</div>";

      var i = PEOPLES.indexOf(p);
      var prev = PEOPLES[(i - 1 + PEOPLES.length) % PEOPLES.length];
      var next = PEOPLES[(i + 1) % PEOPLES.length];
      h += '<div class="d__nav">' +
             '<button data-goto="' + prev.id + '">&larr; ' + esc(prev.name) + "</button>" +
             '<button data-goto="' + next.id + '">' + esc(next.name) + " &rarr;</button>" +
           "</div>";
      return h;
    }

    function showDetail(id, noFly) {
      var p = byId(id);
      if (!p) return;
      activeId = id;
      $("detail").innerHTML = detailHTML(p);
      show(vDetail);
      if (!noFly) flyTo(p.lat, p.lng);
      render();
    }

    /* ---------- cluster ---------- */
    function showCluster(gi) {
      var g = groups[gi];
      if (!g) return;
      var zk = sharedZone(g.members);
      $("clusterTitle").textContent = zk ? ZONES[zk].name : g.members.length + " peoples in this area";
      $("clusterNote").textContent = zk
        ? ZONES[zk].note
        : "These groups fall close together at this zoom level. Zoom in and the marker will separate into its parts — they are neighbours on the map, not one community.";
      $("clusterList").innerHTML = g.members.slice()
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .map(itemHTML).join("");
      $("clusterZoom").onclick = function () {
        map.flyTo(g.latlng, Math.min(MODES[mode].maxZoom, map.getZoom() + 2), { duration: 1 });
      };
      show(vCluster);
    }

    /* ---------- landform / route / province / autonomous unit ---------- */
    function peopleLinks(ids) {
      if (!ids || !ids.length) return "";
      return '<div class="links">' + ids.map(function (id) {
        var p = byId(id);
        return p ? '<button class="link" data-id="' + p.id + '">' + esc(p.name) + "</button>" : "";
      }).join("") + "</div>";
    }

    function showInfo(kind, id) {
      var h = "";

      if (kind === "geo") {
        var f = find(GEO, id);
        if (!f) return;
        h = '<div class="i__kicker">' + esc(GEO_TYPE[f.type]) + "</div>" +
            '<h2 class="i__name">' + esc(f.name) + "</h2>" +
            (f.alt ? '<p class="i__alt">' + esc(f.alt) + "</p>" : "") +
            (f.stat ? '<div class="i__stat">' + esc(f.stat) + "</div>" : "") +
            '<p class="i__sum">' + esc(f.sum) + "</p>" +
            '<p class="i__body">' + esc(f.detail) + "</p>" +
            (f.divides && f.divides.length
              ? '<div class="i__h">Peoples it divides or defines</div>' + peopleLinks(f.divides)
              : "");
        var fp = pathsOf(f);
        if (fp.length) fitPath(fp);
        // a 48 km2 lake and a plateau the size of western Europe should not
        // both be framed at zoom 7
        else flyTo(f.at[0], f.at[1], f.type === "land" ? 6 : 8.5);

      } else if (kind === "route") {
        var r = find(ROUTES, id);
        if (!r) return;
        h = '<div class="i__kicker">Trade road · ' + esc(r.era) + "</div>" +
            '<h2 class="i__name">' + esc(r.name) + "</h2>" +
            '<div class="i__stat">' + esc(r.sum) + "</div>" +
            '<div class="trade__block"><b>What moved</b><p>' + esc(r.goods) + "</p></div>" +
            '<p class="i__body">' + esc(r.detail) + "</p>";
        fitPath(r.path);

      } else if (kind === "prov") {
        var pv = find(PROV, id);
        if (!pv) return;
        var d = density(pv);
        var maxD = 0;
        PROV.forEach(function (x) { maxD = Math.max(maxD, density(x)); });
        h = '<div class="i__kicker">Province-level unit · ' + esc(pv.cn) + "</div>" +
            '<h2 class="i__name">' + esc(pv.name) + "</h2>" +
            '<p class="i__alt">Capital: ' + esc(pv.cap) + "</p>" +
            '<dl class="d__facts">' +
              "<dt>Population</dt><dd>" + comma(pv.pop) + " (2020)</dd>" +
              "<dt>Area</dt><dd>" + comma(pv.area) + " km&sup2;</dd>" +
              "<dt>Density</dt><dd>" + comma(d) + " per km&sup2;</dd>" +
              (pv.min ? "<dt>Minorities</dt><dd>approx. " + pv.min + "% of the population</dd>" : "") +
            "</dl>" +
            '<div class="i__bar"><b><span>Density</span><span>' + comma(d) + " /km&sup2;</span></b>" +
              '<span class="i__track"><i class="i__fill" style="width:' +
              logScale(d, 1, maxD, 3, 100).toFixed(1) + "%;background:" + densityColor(d) +
              '"></i></span></div>' +
            '<p class="i__body">' + esc(pv.note) + "</p>";
        var units = AUTO.filter(function (a) { return (a.prov || "").indexOf(pv.name.split(" ")[0]) === 0; });
        if (units.length) {
          h += '<div class="i__h">Autonomous units here</div>' +
               units.map(function (a) {
                 return rowHTML("auto", a.id, "auto", a.name, a.level);
               }).join("");
        }
        flyTo(pv.lat, pv.lng, 5.5);

      } else if (kind === "hub") {
        var hb = find(INDUSTRY, id);
        if (!hb) return;
        var sec = SECTORS[hb.sector] || { label: "Industry", color: "#95a3b3" };
        var TIER = { 1: "World-scale cluster", 2: "Major national cluster", 3: "Specialist cluster" };
        h = '<div class="i__kicker" style="color:' + sec.color + '">' + esc(sec.label) + "</div>" +
            '<h2 class="i__name">' + esc(hb.name) + "</h2>" +
            '<p class="i__alt">' + esc(hb.cn) + "</p>" +
            '<div class="i__stat">' + esc(TIER[hb.tier]) + "</div>" +
            '<div class="trade__block" style="background:rgba(149,163,179,.14);border-left-color:' +
              sec.color + '">' +
              '<div class="trade__sig" style="color:' + sec.color + '">' + esc(hb.makes) + "</div>" +
              "<b>Who</b><p>" + esc(hb.firms) + "</p></div>" +
            '<p class="i__body">' + esc(hb.note) + "</p>";
        flyTo(hb.lat, hb.lng, 7);

      } else if (kind === "auto") {
        var a = find(AUTO, id);
        if (!a) return;
        h = '<div class="i__kicker">Autonomous ' + esc(a.level) + " · " + esc(a.prov) + "</div>" +
            '<h2 class="i__name">' + esc(a.name) + "</h2>" +
            '<p class="i__body">' + esc(a.note) + "</p>" +
            '<div class="i__h">Peoples here</div>' + peopleLinks(a.peoples);
        flyTo(a.lat, a.lng, a.level === "county" ? 8 : 6.5);
      }

      $("info").innerHTML = h;
      show(vInfo);
    }

    /* ---------- init ---------- */
    function init() {
      panel = $("panel"); scroll = $("panelScroll");
      vIndex = $("viewIndex"); vCluster = $("viewCluster");
      vDetail = $("viewDetail"); vInfo = $("viewInfo"); vAbout = $("viewAbout");

      $("panelToggle").onclick = function () { toggle(); };
      Sheet.init();

      function showAbout() { show(vAbout); }
      $("aboutBtn").onclick = showAbout;
      scroll.addEventListener("click", function (e) {
        if (e.target.closest("#aboutLink")) showAbout();
      });

      $("legendToggle").onclick = function () {
        var bar = $("legendbar");
        var closed = bar.classList.toggle("is-closed");
        this.setAttribute("aria-expanded", String(!closed));
      };

      renderFilters();
      renderList();

      $("search").addEventListener("input", function (e) { query = e.target.value; renderList(); });

      $("filters").addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        activeFam = b.getAttribute("data-fam") || null;
        Array.prototype.forEach.call($("filters").children, function (c) {
          c.classList.toggle("is-on", c === b);
        });
        renderList();
      });

      scroll.addEventListener("click", function (e) {
        var el;
        if ((el = e.target.closest("[data-id]")))    { showDetail(el.getAttribute("data-id")); return; }
        if ((el = e.target.closest("[data-geo]")))   { showInfo("geo",   el.getAttribute("data-geo")); return; }
        if ((el = e.target.closest("[data-route]"))) { showInfo("route", el.getAttribute("data-route")); return; }
        if ((el = e.target.closest("[data-prov]")))  { showInfo("prov",  el.getAttribute("data-prov")); return; }
        if ((el = e.target.closest("[data-auto]")))  { showInfo("auto",  el.getAttribute("data-auto")); return; }
        if ((el = e.target.closest("[data-hub]")))   { showInfo("hub",   el.getAttribute("data-hub")); return; }
        if ((el = e.target.closest("[data-goto]")))  { showDetail(el.getAttribute("data-goto")); return; }
        if (e.target.closest("[data-back]")) { activeId = null; show(vIndex); render(); return; }

        var more = e.target.closest("#readMore");
        if (more) {
          var box = $("more"), open = box.hidden;
          box.hidden = !open;
          more.innerHTML = open ? "Close <span>&uarr;</span>" : "Read more <span>&darr;</span>";
          if (open) box.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { activeId = null; show(vIndex); render(); }
      });
    }

    return {
      init: init, showDetail: showDetail, showCluster: showCluster,
      showInfo: showInfo, toggle: toggle, onModeChange: onModeChange
    };
  })();

  /* ==========================================================
     6. BOOT
     ========================================================== */
  function boot() {
    Panel.init();
    if (typeof L === "undefined") {
      $("map").innerHTML =
        '<div style="position:absolute;inset:0;display:flex;align-items:center;' +
        'justify-content:center;text-align:center;padding:40px;font-family:var(--f-cond);' +
        'letter-spacing:.15em;text-transform:uppercase;color:#8c5a3c">' +
        "The map library could not be loaded.<br>Check your connection and reload.</div>";
      return;
    }
    initMap();
  }

  document.addEventListener("DOMContentLoaded", function () { LoadScreen.run(boot); });
})();
