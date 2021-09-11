console.log("working");

let map = L.map('mapid').setView([40.7, -94.5], 5);

// let marker=L.marker([34.0522, -118.2437]).addTo(map);
// L.circleMarker([34.0522, -118.2437], {
//   radius:100});

L.circleMarker([34.0522, -118.2437], {
  radius: 100,
  color: "red",
  fillColor:"#ffffa1"
}).addTo(map);
// api.mapbox.com/styles/v1/{id}/tiles
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
//   id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(map);

streets.addTo(map);
