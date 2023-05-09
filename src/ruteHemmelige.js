// Start map
var mapHemmelige = L.map('mapHemmelige').setView([56.4507, 9.4109], 17);

// Start GPS
var lc = L.control.locate({
  locateOptions: {
    enableHighAccuracy: true
  },
  setView: false
}).addTo(mapHemmelige);
lc.start();

//let dftoken = '3ebc3a63849a43b46feb8203ab25f83c';
//let myAttributionText = '&copy; <a target="_blank" href="https://dataforsyningen.dk/Vilkaar">SDFI</a>';


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
mapHemmelige.addControl(L.control.basemaps({
  basemaps: basemaps,
  tileX: 0,  // tile X coordinate
  tileY: 0,  // tile Y coordinate
  tileZ: 1   // tile zoom level
}));


// troels fixer kortet
// https://stackoverflow.com/questions/53879753/leaflet-map-does-not-appear-correctly-until-resize
setInterval(function () {
  mapHemmelige.invalidateSize();
}, 100);

function locationHashChanged() {
    if (window.location.hash === "#routeHemmelige") {
      mapHemmelige.invalidateSize(true);
        $(".listButton").css("background-color","#343434");
        $(".mapButton").css("background-color","#004036");
    }
    else {
        $(".listButton").css("background-color","#004036");
        $(".mapButton").css("background-color","#343434");
    }
  }
window.onhashchange = locationHashChanged;


const dbNameHemmelige = "hemmeligeRute";
const dbVersionHemmelige = 1;


function fetchAndStoreHemmelige() {
  indexedDB.deleteDatabase(dbNameHemmelige);
  fetch(hemmeligeData)
  .then(response => response.json())
  .then(pois => {
    console.log("Dette er hemmeligeData: " + hemmeligeData)
    // Open a connection to your IndexedDB database
    const openRequest = indexedDB.open(dbNameHemmelige, dbVersionHemmelige);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;

      // Create an object store within the database to store your data
      const objectStore = db.createObjectStore('hemmeligeRute', { keyPath: 'id' });

      // Define the structure of the data to be stored
      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('shortdescription', 'shortdescription', { unique: false });
      objectStore.createIndex('text', 'text', { unique: false });
      objectStore.createIndex('handicap', 'handicap', { unique: false });
      objectStore.createIndex('audio', 'audio', { unique: false });

      // Add data to the object store
      pois.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('hemmeligeRute', 'readonly');
      const objectStore = transaction.objectStore('hemmeligeRute');

      // Retrieve data from the object store
      const request = objectStore.getAll();
      request.onsuccess = function(event) {
        const pois = event.target.result;

        pois.forEach(poi => {
          poi.text = poi.text.replace(/(?<!\\)'/g, '`');
          poi.title = poi.title.replace(/(?<!\\)'/g, '`');
          poi.shortdescription = poi.shortdescription.replace(/(?<!\\)'/g, '`');
          console.log(poi.audio)


             // Hent ikoner til visning på kort
             let myIcon = L.icon({
              iconUrl: poi.icon.normal,
              iconSize: [38, 38],
              popupAnchor: [0, -15]
            });

          // Create a marker on the map for each POI
              L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mapHemmelige)
              .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/> <a href='public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&audio=" + encodeURIComponent(poi.audio) + "&text=" + encodeURIComponent(poi.text)+"'>"+ info + "</a>" + (poi.handicap ? "<br/><br>" + poi.handicap + "<br/><br/>" : "" ));

        });
      };
    };
  })
  .catch(error => {
    console.error(error);
  });
}

  const dbNameRouteHemmelige = "hemmeligeRutePath"

  
  fetch('/data/ruteData/tours-hemmelige.json')
  .then(response => response.json())
  .then(route => {

    const openRequest = indexedDB.open(dbNameRouteHemmelige, dbVersionHemmelige);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;


      const objectStore = db.createObjectStore('hemmeligeRutePath', { keyPath: 'id' });


      objectStore.createIndex('id', 'id', { unique: false });
      objectStore.createIndex('points', 'points', { unique: false });
      objectStore.createIndex('location', 'location', { unique: false });
      objectStore.createIndex('lat', 'lat', { unique: false });
      objectStore.createIndex('lng', 'lng', { unique: false });

      route.forEach(obj => objectStore.add(obj));
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('hemmeligeRutePath', 'readonly');
      const objectStore = transaction.objectStore('hemmeligeRutePath');

      const request = objectStore.getAll();
request.onsuccess = function(event) {
  const route = event.target.result;

  route.forEach(rute => {
    const points = rute.points.map(point => L.latLng(point.location.lat, point.location.lng));
    L.polyline(points, {color: 'red'}).addTo(mapHemmelige);
  });
};
    };
  })
  .catch(error => {
    console.error(error);
  });

  // Load event listener
  window.addEventListener('load',() => {    
    fetchAndStoreHemmelige();
  });
  
  // Fetch data event listener
  window.addEventListener('fetchDataUpdated',() => {    
    fetchAndStoreHemmelige();
  });