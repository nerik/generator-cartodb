SELECT
  the_geom,
  the_geom_webmercator,
  name,
  ST_Area(the_geom::geography)/1000000 area
FROM
  european_countries_e;
