// const { coordinates } = require("@maptiler/client");
const maptilerToken = "<%= process.env.MAP_TOKEN %>";

maptilersdk.config.apiKey = maptilerToken;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Add a marker at the coordinates
if(coordinates && Array.isArray(coordinates) && coordinates.length==2){
    map.setCenter(coordinates);

    new maptilersdk.Marker()
    .setLngLat(coordinates)
    .addTo(map);
}
