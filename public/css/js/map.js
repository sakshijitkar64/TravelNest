console.log("MAP.JS LOADED");
console.log("coordinates =", coordinates);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 12
});

new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);