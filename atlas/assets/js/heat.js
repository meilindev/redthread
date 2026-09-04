/* ============================================================
   A small heat-surface layer for Leaflet.

   Written rather than pulled in as a plugin: it is about eighty
   lines, and it lets the ramp stay in the atlas's own palette
   instead of the usual blue-green-red.

   Each place is painted as a radial falloff into an intensity
   buffer with additive compositing, then the accumulated
   intensity is mapped through a warm ramp. Intensity uses the
   cube root of population, so Shanghai does not white out every
   city around it.
   ============================================================ */
window.HeatLayer = L.Layer.extend({

  options: {
    // radius in pixels at zoom 4, doubling with each zoom level
    baseRadius: 13,
    minRadius: 6,
    maxRadius: 90,
    opacity: 0.88,
    // stop: [position 0-1, r, g, b]
    ramp: [
      [0.00,   0,   0,   0],
      [0.12, 240, 226, 192],
      [0.32, 232, 192, 106],
      [0.55, 217, 139,  58],
      [0.78, 184,  81,  42],
      [1.00, 107,  32,  18]
    ]
  },

  initialize: function (points, options) {
    this._points = points || [];
    L.setOptions(this, options);
    this._maxWeight = 0;
    for (var i = 0; i < this._points.length; i++) {
      this._maxWeight = Math.max(this._maxWeight, Math.cbrt(this._points[i][2]));
    }
  },

  onAdd: function (map) {
    this._map = map;
    this._canvas = L.DomUtil.create("canvas", "leaflet-heat leaflet-layer leaflet-zoom-hide");
    // beneath the vector renderer, so province outlines stay on top of the heat
    var pane = map.getPanes().overlayPane;
    pane.insertBefore(this._canvas, pane.firstChild);
    map.on("moveend zoomend resize", this._redraw, this);
    this._buildLut();
    this._redraw();
  },

  onRemove: function (map) {
    if (this._retry) { clearTimeout(this._retry); this._retry = null; }
    map.off("moveend zoomend resize", this._redraw, this);
    if (this._canvas && this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._canvas = null;
  },

  /* 256-entry colour lookup built once from the ramp */
  _buildLut: function () {
    var stops = this.options.ramp, lut = new Uint8ClampedArray(256 * 4);
    for (var i = 0; i < 256; i++) {
      var t = i / 255, a = stops[0], b = stops[stops.length - 1];
      for (var s = 0; s < stops.length - 1; s++) {
        if (t >= stops[s][0] && t <= stops[s + 1][0]) { a = stops[s]; b = stops[s + 1]; break; }
      }
      var span = (b[0] - a[0]) || 1, k = (t - a[0]) / span;
      lut[i * 4]     = a[1] + (b[1] - a[1]) * k;
      lut[i * 4 + 1] = a[2] + (b[2] - a[2]) * k;
      lut[i * 4 + 2] = a[3] + (b[3] - a[3]) * k;
      // fade in over the first stretch so empty ground stays clean
      lut[i * 4 + 3] = Math.min(255, t * 3.2 * 255) * this.options.opacity;
    }
    this._lut = lut;
  },

  _radius: function () {
    var r = this.options.baseRadius * Math.pow(2, this._map.getZoom() - 4);
    return Math.max(this.options.minRadius, Math.min(this.options.maxRadius, r));
  },

  _redraw: function () {
    if (!this._map || !this._canvas) return;
    var map = this._map, size = map.getSize(), canvas = this._canvas;

    // Added before layout, or while the map sits in a hidden container, the
    // size is zero. Draw nothing, but keep asking: a background tab fires no
    // resize when it is finally shown, so without this the surface would
    // stay blank for the rest of the session.
    if (!size.x || !size.y) {
      if (!this._retry) {
        this._retry = setTimeout(L.bind(function () {
          this._retry = null;
          this._redraw();
        }, this), 400);
      }
      return;
    }

    if (canvas.width !== size.x || canvas.height !== size.y) {
      canvas.width = size.x; canvas.height = size.y;
    }
    L.DomUtil.setPosition(canvas, map.containerPointToLayerPoint([0, 0]));

    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, size.x, size.y);

    var radius = this._radius(), pad = radius * 2;
    var bounds = map.getBounds().pad(0.25);

    // 1. accumulate intensity in the alpha channel
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < this._points.length; i++) {
      var p = this._points[i];
      if (!bounds.contains([p[0], p[1]])) continue;
      var pt = map.latLngToContainerPoint([p[0], p[1]]);
      if (pt.x < -pad || pt.y < -pad || pt.x > size.x + pad || pt.y > size.y + pad) continue;

      var weight = Math.cbrt(p[2]) / this._maxWeight;         // 0..1
      var g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
      g.addColorStop(0, "rgba(0,0,0," + (0.10 + weight * 0.75).toFixed(3) + ")");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    // 2. map accumulated alpha through the ramp
    var img = ctx.getImageData(0, 0, size.x, size.y), d = img.data, lut = this._lut;
    for (var j = 0; j < d.length; j += 4) {
      var v = d[j + 3];
      if (!v) continue;
      var o = v * 4;
      d[j]     = lut[o];
      d[j + 1] = lut[o + 1];
      d[j + 2] = lut[o + 2];
      d[j + 3] = lut[o + 3];
    }
    ctx.putImageData(img, 0, 0);
  }
});
