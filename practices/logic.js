console.log("working");

let map = L.map('mapid').setView([37.5, -122.5], 10);

// cities.forEach(city=>{
//   console.log(city);
//   let marker=L.marker(city.location)
//   .bindPopup("<h2>"+city.city +","+ city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString()  + "</h3>" ).addTo(map);
// })

let line=[];
cities.forEach(city=>{
  console.log(city);
  L.circleMarker(city.location ,{
    radius: city.population/100000
  })
  .bindPopup("<h2>"+city.city +","+ city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString()  + "</h3>" ).addTo(map);
  line.push(city.location);
})

console.log(line);

L.polyline(line,{
  color: "blue"
}).addTo(map);





// let marker=L.marker([34.0522, -118.2437]).addTo(map);
// L.circleMarker([34.0522, -118.2437], {
//   radius:100});

// L.circleMarker([34.0522, -118.2437], {
//   radius: 100,
//   color: "red",
//   fillColor:"#ffffa1"
// }).addTo(map);
// api.mapbox.com/styles/v1/{id}/tiles


let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};


// L.geoJSON(sanFranAirport,{
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng).bindPopup("<h2>" + feature.properties.city +  "</h2><hr><h3> Airport: " +feature.properties.name +"</h3>"); }
// }).addTo(map);

L.geoJson(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer)
    layer.bindPopup("<h2>" + feature.properties.city +  "</h2><hr><h3> Airport: " +feature.properties.name +"</h3>");
   }
}).addTo(map);



L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
//   id: "mapbox/outdoors-v11",
  accessToken: API_KEY
}).addTo(map);

streets.addTo(map);
