// Start map
var mymap = L.map('map').setView([56.4534, 9.4029], 13);


// Start GPS
var lc = L.control.locate({locateOptions: {enableHighAccuracy: true}}).addTo(mymap);
lc.start();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

L.Routing.control({
  waypoints: [
    L.latLng(56.45053, 9.4125),
    L.latLng(56.45589, 9.40207)
  ],
  routeWhileDragging: true,
  geocoder: false,
  showAlternatives: false,
  show: false,
  draggableWaypoints: false,
}).addTo(mymap);


const testDist = calculateDistance(56.45053, 9.4125, 56.45589, 9.40207)
console.log(testDist)