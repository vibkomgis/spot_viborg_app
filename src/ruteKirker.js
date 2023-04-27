//Map til kirkeruten

const southWest = L.latLng(56.4394, 9.3444);
const northEast = L.latLng(56.4714, 9.4502);
const bounds = L.latLngBounds(southWest, northEast);

let mapKirke = L.map('mapKirke', {
   //maxBounds: bounds,
   //maxBoundsViscosity: 1.0,
   //minZoom: 13, // set minZoom to the same value as the initial zoom
   //maxZoom: 60 // set maxZoom to the same value as the initial zoom
}).setView([56.4507, 9.4109], 17); //13



// Start GPS
var lc = L.control.locate({
  locateOptions: {
    enableHighAccuracy: true
  },
  setView: false
}).addTo(mapKirke);
lc.start();


const dftoken = '3ebc3a63849a43b46feb8203ab25f83c';
const myAttributionText = '&copy; <a target="_blank" href="https://dataforsyningen.dk/Vilkaar">SDFI</a>';


// Her tilføjes topo og ortofoto til kortet. 
// https://github.com/consbio/Leaflet.Basemaps
var basemaps = [
 L.tileLayer.wms('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 0,
  attribution: myAttributionText,

}),
L.tileLayer.wms('https://api.dataforsyningen.dk/orto_foraar_DAF?ignoreillegallayers=TRUE', {
  attribution: myAttributionText,
  token: dftoken,
  layers: 'orto_foraar',
  format: 'image/png',
  maxZoom: 20,
  minZoom: 0,

})
]
mapKirke.addControl(L.control.basemaps({
  basemaps: basemaps,
  tileX: 0,  // tile X coordinate
  tileY: 0,  // tile Y coordinate
  tileZ: 1   // tile zoom level
}));


// troels fixer kortet
// https://stackoverflow.com/questions/53879753/leaflet-map-does-not-appear-correctly-until-resize
setTimeout(function () {
  mapKirke.invalidateSize(true);
}, 5000 );

function locationHashChanged() {
    if (window.location.hash === "#routeKirke") {
      mapKirke.invalidateSize(true);
        $(".listButton").css("background-color","#343434");
        $(".mapButton").css("background-color","#004036");
    }
    else {
        $(".listButton").css("background-color","#004036");
        $(".mapButton").css("background-color","#343434");
    }
  }
window.onhashchange = locationHashChanged;

const dbName = "kirkeRute";
const dbVersion = 1;


fetch('/data/ruteData/da-kirke-rute.json')
  .then(response => response.json())
  .then(pois => {
    // Open a connection to your IndexedDB database
    const openRequest = indexedDB.open(dbName, dbVersion);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;

      // Create an object store within the database to store your data
      const objectStore = db.createObjectStore('kirkeRute', { keyPath: 'id' });

      // Define the structure of the data to be stored
      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
      objectStore.createIndex('text', 'text', { unique: false });
      objectStore.createIndex('icon', 'icon', { unique: false });

      // Add data to the object store
      pois.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('kirkeRute', 'readonly');
      const objectStore = transaction.objectStore('kirkeRute');

      // Retrieve data from the object store
      const request = objectStore.getAll();
      request.onsuccess = function(event) {
        const pois = event.target.result;

        pois.forEach(poi => {
          poi.text = poi.text.replace(/'/g, '');



             // Hent ikoner til visning på kort
             let myIcon = L.icon({
              iconUrl: poi.icon.normal,
              iconSize: [38, 38],
              popupAnchor: [0, -15]
            });

          // Create a marker on the map for each POI
          L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mapKirke)
          .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='../public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text)+"'>Hør mere her</a>");

        });
      };
    };
  })
  .catch(error => {
    console.error(error);
  });


  const dbNameRoute = "kirkeRutePath"

  
  fetch('/data/ruteData/tours-kirke.json')
  .then(response => response.json())
  .then(route => {

    const openRequest = indexedDB.open(dbNameRoute, dbVersion);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;


      const objectStore = db.createObjectStore('kirkeRutePath', { keyPath: 'id' });


      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('points', 'points', { unique: false });
      objectStore.createIndex('location', 'location', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });

      route.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('kirkeRutePath', 'readonly');
      const objectStore = transaction.objectStore('kirkeRutePath');

      const request = objectStore.getAll();
request.onsuccess = function(event) {
  const route = event.target.result;

  route.forEach(rute => {
    const points = rute.points.map(point => L.latLng(point.location.lat, point.location.lng));
    L.polyline(points, {color: 'red'}).addTo(mapKirke);
  });
};
    };
  })
  .catch(error => {
    console.error(error);
  });

