console.log("working");

let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
//   id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
let overlays = {
  Earthquakes: earthquakes
};

// Create a legend control object.
// let legend = L.control({
//   position: "bottomright"
// });
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");
//   const magnitudes = [0, 1, 2, 3, 4, 5];
//   const colors = [
//     "#98ee00",
//     "#d4ee00",
//     "#eecc00",
//     "#ee9c00",
//     "#ea822c",
//     "#ea2c2c"
//   ];
// };


// Looping through our intervals to generate a label with a colored square for each interval.


// legend.addTo(map);



let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

L.control.layers(baseMaps, overlays).addTo(map);



// streets.addTo(map);

let myStyle = {
  color: "#ffffa1",
  weight: 2
  }

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, { 
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
        },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

    }).addTo(map);
});

  

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
};

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
};



