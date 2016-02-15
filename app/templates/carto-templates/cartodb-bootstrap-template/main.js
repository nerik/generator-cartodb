var map = new L.Map('map', {
  center: [40.1,-100.3],
  zoom: 4
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/236085de-ea08-11e2-958c-5404a6a683d5/viz.json';

cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {

  }).on('error', function() {
    //log the error
  });
