#!/usr/bin/env node
/*eslint-env node*/

// outputs a tiles URL usable in a Leaflet layer
// uses the Carto anonymous map API

var fs = require('fs');
var _ = require('underscore');
var request = require('request');

// parameters needed by the Carto API
var mapconfigFile = 'mapconfig.json';

// map styles in Carto(CSS) format
var cartocssFile = 'map.mss';

// sql commands file
var sqlFile = 'map.sql';

// read files
var mapconfig = fs.readFileSync(mapconfigFile, 'utf-8');
var cartocss = fs.readFileSync(cartocssFile, 'utf-8');
var sql = fs.readFileSync(sqlFile, 'utf-8');

// inject SQL and Carto(CSS)
mapconfig = _.template(mapconfig)({
  cartocss: cartocss.replace(/\r?\n|\r/g, ' '),
  sql: sql.replace(/\r?\n|\r/g, ' ')
});

var username = '<%= props.username %>';
var url = 'https://' + username + '.carto.com/api/v1/map';

request({
  url: url,
  method: 'POST',
  json: JSON.parse(mapconfig)
},
  mapconfig,
  function (error, response) {
    if (!error && response.statusCode == 200) {
      var tilesUrl = url + '/' + response.body.layergroupid + '/{z}/{x}/{y}.png';
      process.stdout.write(tilesUrl);
    }
  }
);
