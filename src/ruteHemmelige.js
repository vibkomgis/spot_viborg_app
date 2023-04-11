// Start map
var mymap = L.map('map').setView([56.4507, 9.4109], 17);




// Start GPS
var lc = L.control.locate({
  locateOptions: {
    enableHighAccuracy: true
  },
  setView: false
}).addTo(mymap);
lc.start();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);



const dbName = "hemmeligeRute";
const dbVersion = 1;


fetch('/data/ruteData/da-hemmelige-rute.json')
  .then(response => response.json())
  .then(pois => {
    // Open a connection to your IndexedDB database
    const openRequest = indexedDB.open(dbName, dbVersion);

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
      objectStore.createIndex('icon', 'icon', { unique: false });

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
          poi.text = poi.text.replace(/'/g, '');



             // Hent ikoner til visning på kort
             let myIcon = L.icon({
              iconUrl: poi.icon.normal,
              iconSize: [38, 38],
              popupAnchor: [0, -15]
            });

          // Create a marker on the map for each POI
          L.marker([poi.location.lat, poi.location.lng], {icon: myIcon}).addTo(mymap)
          .bindPopup("<b>" + poi.title + "</b><br />" + poi.shortdescription + "<br/><a href='../public/poiPage.html?id=" + encodeURIComponent(poi.id) +"&title=" + encodeURIComponent(poi.title) + "&text=" + encodeURIComponent(poi.text)+"'>Hør mere her</a>");

        });
      };
    };
  })
  .catch(error => {
    console.error(error);
  });


  const dbNameRoute = "hemmeligeRutePath"

  
  fetch('/data/ruteData/tours-hemmelige.json')
  .then(response => response.json())
  .then(route => {

    const openRequest = indexedDB.open(dbNameRoute, dbVersion);

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
    L.polyline(points, {color: 'red'}).addTo(mymap);
  });
};
    };
  })
  .catch(error => {
    console.error(error);
  });

