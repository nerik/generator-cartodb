(function() {
  function main() {
    var map = L.map('map', {
      scrollWheelZoom: false,
      center: [50, 0],
      zoom: 5
    });

    var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' });
    map.addLayer(basemap);

    // run create_anonymous_map to generate this URL from CartoCSS and SQL
    var cartoLayer = L.tileLayer('https://documentation.carto.com/api/v1/map/60caf3c5c9f72a50d76f1facc94ae7fa:0/{z}/{x}/{y}.png');

    map.addLayer(cartoLayer);
  }
  window.onload = main;
})();
